from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class AlertBase(BaseModel):
    title: str
    description: Optional[str] = None
    severity: str
    confidence: Optional[int] = 50
    risk_score: Optional[float] = None
    status: Optional[str] = "new"
    source: Optional[str] = None
    detection_rule_id: Optional[str] = None
    mitre_tactic: Optional[str] = None
    mitre_technique: Optional[str] = None
    affected_asset_id: Optional[str] = None
    affected_ip: Optional[str] = None
    affected_user: Optional[str] = None
    event_ids: Optional[List[str]] = []
    evidence: Optional[Dict[str, Any]] = {}
    assigned_to: Optional[str] = None
    incident_id: Optional[str] = None

class AlertCreate(AlertBase):
    pass

class AlertUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    severity: Optional[str] = None
    confidence: Optional[int] = None
    risk_score: Optional[float] = None
    status: Optional[str] = None
    assigned_to: Optional[str] = None
    incident_id: Optional[str] = None

class AlertResponse(AlertBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class AlertStats(BaseModel):
    total: int
    by_severity: Dict[str, int]
    by_status: Dict[str, int]
