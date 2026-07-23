from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class IOCBase(BaseModel):
    value: str
    type: str
    severity: Optional[str] = "high"
    source: Optional[str] = None
    tags: Optional[List[str]] = []
    is_active: Optional[bool] = True

class IOCCreate(IOCBase):
    pass

class IOCResponse(IOCBase):
    id: str
    first_seen: datetime
    last_seen: datetime
    created_at: datetime

    class Config:
        from_attributes = True

class ThreatFeedBase(BaseModel):
    name: str
    url: str
    description: Optional[str] = None
    enabled: Optional[bool] = True

class ThreatFeedCreate(ThreatFeedBase):
    pass

class ThreatFeedResponse(ThreatFeedBase):
    id: str
    last_fetched: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
