from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class AssetGroupBase(BaseModel):
    name: str
    description: Optional[str] = None
    criticality: Optional[int] = 3

class AssetGroupCreate(AssetGroupBase):
    pass

class AssetGroupResponse(AssetGroupBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class AssetBase(BaseModel):
    hostname: str
    ip_address: Optional[str] = None
    mac_address: Optional[str] = None
    os_type: Optional[str] = None
    criticality: Optional[int] = 3
    group_id: Optional[str] = None

class AssetCreate(AssetBase):
    pass

class AssetUpdate(BaseModel):
    hostname: Optional[str] = None
    ip_address: Optional[str] = None
    mac_address: Optional[str] = None
    os_type: Optional[str] = None
    criticality: Optional[int] = None
    group_id: Optional[str] = None

class AssetResponse(AssetBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
