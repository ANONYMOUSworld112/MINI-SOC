from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class RuleBase(BaseModel):
    name: str
    description: Optional[str] = None
    severity: str
    sigma_rule: str
    mitre_tactics: Optional[List[str]] = []
    mitre_techniques: Optional[List[str]] = []
    enabled: Optional[bool] = True

class RuleCreate(RuleBase):
    pass

class RuleUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    severity: Optional[str] = None
    sigma_rule: Optional[str] = None
    mitre_tactics: Optional[List[str]] = None
    mitre_techniques: Optional[List[str]] = None
    enabled: Optional[bool] = None

class RuleResponse(RuleBase):
    id: str
    false_positive_rate: float
    last_triggered: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class CorrelationRuleBase(BaseModel):
    name: str
    description: Optional[str] = None
    conditions: List[Dict[str, Any]]
    time_window_seconds: int
    threshold: int
    mitre_tactic: Optional[str] = None
    mitre_technique: Optional[str] = None
    enabled: Optional[bool] = True

class CorrelationRuleCreate(CorrelationRuleBase):
    pass

class CorrelationRuleResponse(CorrelationRuleBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
