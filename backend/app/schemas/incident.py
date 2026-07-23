from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class IncidentNoteBase(BaseModel):
    content: str

class IncidentNoteCreate(IncidentNoteBase):
    pass

class IncidentNoteResponse(IncidentNoteBase):
    id: str
    incident_id: str
    author_id: str
    created_at: datetime

    class Config:
        from_attributes = True

class IncidentEvidenceBase(BaseModel):
    evidence_type: str
    content: str
    description: Optional[str] = None

class IncidentEvidenceCreate(IncidentEvidenceBase):
    pass

class IncidentEvidenceResponse(IncidentEvidenceBase):
    id: str
    incident_id: str
    author_id: str
    created_at: datetime

    class Config:
        from_attributes = True

class IncidentBase(BaseModel):
    title: str
    description: Optional[str] = None
    severity: str
    status: Optional[str] = "new"
    assigned_to: Optional[str] = None
    sla_deadline: Optional[datetime] = None
    affected_assets: Optional[List[str]] = []
    timeline: Optional[List[Dict[str, Any]]] = []

class IncidentCreate(IncidentBase):
    pass

class IncidentUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    severity: Optional[str] = None
    status: Optional[str] = None
    assigned_to: Optional[str] = None
    sla_deadline: Optional[datetime] = None
    affected_assets: Optional[List[str]] = None
    timeline: Optional[List[Dict[str, Any]]] = None

class IncidentResponse(IncidentBase):
    id: str
    created_at: datetime
    updated_at: datetime
    notes: List[IncidentNoteResponse] = []
    evidence: List[IncidentEvidenceResponse] = []

    class Config:
        from_attributes = True
