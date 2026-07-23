import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Table
from sqlalchemy.orm import relationship
from app.database import Base

class AssetGroup(Base):
    __tablename__ = "asset_groups"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False, unique=True)
    description = Column(String)
    criticality = Column(Integer, default=3) # 1-5 scale
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    assets = relationship("Asset", back_populates="group")

class Asset(Base):
    __tablename__ = "assets"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    hostname = Column(String, index=True, nullable=False)
    ip_address = Column(String, index=True)
    mac_address = Column(String)
    os_type = Column(String) # windows, linux, network, etc
    criticality = Column(Integer, default=3) # 1-5 scale
    group_id = Column(String, ForeignKey("asset_groups.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    group = relationship("AssetGroup", back_populates="assets")
