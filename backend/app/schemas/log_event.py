from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from datetime import datetime

class LogEventBase(BaseModel):
    timestamp: Optional[datetime] = None
    source_type: Optional[str] = None
    source_ip: Optional[str] = None
    dest_ip: Optional[str] = None
    source_port: Optional[int] = None
    dest_port: Optional[int] = None
    hostname: Optional[str] = None
    username: Optional[str] = None
    process_name: Optional[str] = None
    process_id: Optional[str] = None
    parent_process: Optional[str] = None
    command_line: Optional[str] = None
    event_id: Optional[str] = None
    severity: Optional[str] = None
    category: Optional[str] = None
    action: Optional[str] = None
    outcome: Optional[str] = None
    raw_log: str
    geo_country: Optional[str] = None
    geo_city: Optional[str] = None
    asset_id: Optional[str] = None
    tags: Optional[Dict[str, Any]] = None
    mitre_tactic: Optional[str] = None
    mitre_technique: Optional[str] = None

class LogEventCreate(LogEventBase):
    pass

class LogEventResponse(LogEventBase):
    id: str
    
    class Config:
        from_attributes = True

class SearchQuery(BaseModel):
    query: str = ""
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    limit: int = 100
    offset: int = 0
