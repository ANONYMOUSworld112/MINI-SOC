from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import datetime, timedelta
from app.models.log_event import LogEvent
from app.models.alert import Alert
from app.models.incident import Incident
from app.schemas.dashboard import DashboardStats, TimeSeriesData

class DashboardService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_stats(self) -> DashboardStats:
        now = datetime.utcnow()
        day_ago = now - timedelta(days=1)
        
        # Total events 24h
        events_res = await self.db.execute(select(func.count(LogEvent.id)).where(LogEvent.timestamp >= day_ago))
        total_events_24h = events_res.scalar() or 0
        
        # Active incidents
        incidents_res = await self.db.execute(select(func.count(Incident.id)).where(Incident.status.in_(["new", "investigating", "containment", "eradication", "recovery"])))
        active_incidents = incidents_res.scalar() or 0
        
        # Critical alerts
        alerts_res = await self.db.execute(select(func.count(Alert.id)).where(Alert.severity == "critical", Alert.status == "new"))
        critical_alerts = alerts_res.scalar() or 0
        
        # Risk posture
        risk_posture = 75 # Mock calculation
        
        # Alerts by severity
        severities = ["critical", "high", "medium", "low", "info"]
        alerts_by_severity = {}
        for sev in severities:
            res = await self.db.execute(select(func.count(Alert.id)).where(Alert.severity == sev))
            alerts_by_severity[sev] = res.scalar() or 0
            
        # Alerts by status
        statuses = ["new", "investigating", "resolved", "false_positive"]
        alerts_by_status = {}
        for st in statuses:
            res = await self.db.execute(select(func.count(Alert.id)).where(Alert.status == st))
            alerts_by_status[st] = res.scalar() or 0
            
        # Trend data (mocked for past 6 hours)
        trend = []
        for i in range(6, -1, -1):
            t = (now - timedelta(hours=i)).strftime("%H:00")
            trend.append(TimeSeriesData(timestamp=t, value=total_events_24h // 7)) # roughly average
            
        return DashboardStats(
            total_events_24h=total_events_24h,
            active_incidents=active_incidents,
            critical_alerts=critical_alerts,
            risk_posture_score=risk_posture,
            alerts_by_severity=alerts_by_severity,
            alerts_by_status=alerts_by_status,
            top_targeted_assets=[], # Mocked
            events_trend=trend,
            ingestion_rate=round(total_events_24h / 86400, 2)
        )
