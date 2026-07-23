import yaml
from typing import List, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.log_event import LogEvent
from app.models.detection_rule import DetectionRule

class DetectionEngine:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def evaluate_event(self, event: LogEvent) -> List[DetectionRule]:
        result = await self.db.execute(select(DetectionRule).where(DetectionRule.enabled == True))
        rules = result.scalars().all()
        
        triggered_rules = []
        for rule in rules:
            if self._match_sigma_rule(rule.sigma_rule, event):
                triggered_rules.append(rule)
                
        return triggered_rules

    def _match_sigma_rule(self, sigma_yaml: str, event: LogEvent) -> bool:
        try:
            rule_data = yaml.safe_load(sigma_yaml)
            # A very simplified sigma matching logic for demonstration
            if 'detection' in rule_data:
                detection = rule_data['detection']
                condition = detection.get('condition', '')
                
                # Simple dictionary check for exact matches
                # If there's a selection block, check if event matches it
                if 'selection' in detection:
                    selection = detection['selection']
                    is_match = True
                    for k, v in selection.items():
                        event_val = getattr(event, k, None)
                        if event_val is None:
                            if event.tags and k in event.tags:
                                event_val = event.tags[k]
                            else:
                                is_match = False
                                break
                        
                        if isinstance(v, list):
                            if event_val not in v:
                                is_match = False
                                break
                        elif event_val != v:
                            is_match = False
                            break
                    if is_match:
                        return True
            return False
        except Exception:
            return False
