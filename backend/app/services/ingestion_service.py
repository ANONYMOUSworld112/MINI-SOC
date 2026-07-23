from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.log_event import LogEvent
from app.models.alert import Alert
from app.models.asset import Asset
from app.schemas.log_event import LogEventCreate
from app.services.detection_engine import DetectionEngine
from app.services.correlation_engine import CorrelationEngine
from app.services.threat_intel_service import ThreatIntelService
from app.services.risk_engine import RiskEngine
from app.core.websocket_manager import manager

class IngestionService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.detection = DetectionEngine(db)
        self.correlation = CorrelationEngine(db)
        self.threat_intel = ThreatIntelService(db)
        self.risk = RiskEngine()

    async def ingest_event(self, event_in: LogEventCreate) -> LogEvent:
        # 1. Normalize & Save Event
        event = LogEvent(**event_in.model_dump())
        self.db.add(event)
        await self.db.commit()
        await self.db.refresh(event)
        
        await manager.broadcast({"type": "metric", "data": {"ingestion": 1}})

        # 2. Enrich (Asset info)
        asset_criticality = 3
        if event.asset_id:
            asset_res = await self.db.execute(select(Asset).where(Asset.id == event.asset_id))
            asset = asset_res.scalars().first()
            if asset:
                asset_criticality = asset.criticality

        # 3. Check Threat Intel
        matched_iocs = await self.threat_intel.check_iocs(event)
        has_threat = len(matched_iocs) > 0

        # 4. Detection Rules (Sigma)
        triggered_rules = await self.detection.evaluate_event(event)

        # 5. Correlation Rules
        triggered_correlations = await self.correlation.evaluate_event(event)

        # 6. Generate Alerts
        for rule in triggered_rules:
            risk_score = self.risk.calculate_risk_score(
                severity=rule.severity,
                confidence=80,
                asset_criticality=asset_criticality,
                has_threat_intel=has_threat
            )
            
            alert = Alert(
                title=f"Detection Alert: {rule.name}",
                description=rule.description,
                severity=rule.severity,
                confidence=80,
                risk_score=risk_score,
                source="detection",
                detection_rule_id=rule.id,
                mitre_tactic=rule.mitre_tactics[0] if rule.mitre_tactics else None,
                mitre_technique=rule.mitre_techniques[0] if rule.mitre_techniques else None,
                affected_asset_id=event.asset_id,
                affected_ip=event.dest_ip or event.source_ip,
                affected_user=event.username,
                event_ids=[event.id],
                evidence={"rule_matched": rule.name, "raw_log": event.raw_log}
            )
            self.db.add(alert)
            await self.db.commit()
            
            # Websocket broadcast
            await manager.broadcast({
                "type": "new_alert", 
                "data": {"id": alert.id, "title": alert.title, "severity": alert.severity}
            })

        for corr in triggered_correlations:
            risk_score = self.risk.calculate_risk_score(
                severity="high",
                confidence=90,
                asset_criticality=asset_criticality,
                has_threat_intel=has_threat
            )
            
            alert = Alert(
                title=f"Correlation Alert: {corr.name}",
                description=corr.description,
                severity="high",
                confidence=90,
                risk_score=risk_score,
                source="correlation",
                mitre_tactic=corr.mitre_tactic,
                mitre_technique=corr.mitre_technique,
                affected_asset_id=event.asset_id,
                affected_ip=event.source_ip,
                event_ids=[event.id],
                evidence={"correlation_matched": corr.name}
            )
            self.db.add(alert)
            await self.db.commit()

            await manager.broadcast({
                "type": "new_alert", 
                "data": {"id": alert.id, "title": alert.title, "severity": alert.severity}
            })

        return event
