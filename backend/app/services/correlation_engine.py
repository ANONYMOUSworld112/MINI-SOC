from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime, timedelta
from app.models.log_event import LogEvent
from app.models.detection_rule import CorrelationRule

class CorrelationEngine:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def evaluate_event(self, event: LogEvent) -> list:
        # In a real system, this would maintain state in Redis.
        # For this prototype, we will query recent events from DB.
        
        result = await self.db.execute(select(CorrelationRule).where(CorrelationRule.enabled == True))
        rules = result.scalars().all()
        
        triggered_rules = []
        for rule in rules:
            if await self._evaluate_rule(rule, event):
                triggered_rules.append(rule)
                
        return triggered_rules
        
    async def _evaluate_rule(self, rule: CorrelationRule, current_event: LogEvent) -> bool:
        # Simplified correlation: check if recent events match the rule conditions
        time_window = timedelta(seconds=rule.time_window_seconds)
        start_time = datetime.utcnow() - time_window
        
        # Check if current event matches any condition to even bother checking DB
        match = False
        for condition in rule.conditions:
            if current_event.event_id == condition.get("event_id"):
                match = True
                break
        
        if not match:
            return False
            
        # Example: count events from same source IP
        if not current_event.source_ip:
            return False
            
        # Query recent events
        result = await self.db.execute(
            select(LogEvent).where(
                LogEvent.source_ip == current_event.source_ip,
                LogEvent.timestamp >= start_time
            )
        )
        events = result.scalars().all()
        
        if len(events) >= rule.threshold:
            return True
            
        return False
