import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime, Boolean, JSON, ForeignKey
from app.database import Base

class ThreatFeed(Base):
    __tablename__ = "threat_feeds"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    url = Column(String, nullable=False)
    description = Column(String)
    enabled = Column(Boolean, default=True)
    last_fetched = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class IOC(Base):
    __tablename__ = "iocs"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    value = Column(String, index=True, nullable=False)
    type = Column(String, index=True, nullable=False) # ip, domain, url, hash_md5, hash_sha256, email, cve
    severity = Column(String, default="high")
    source = Column(String) # custom, or feed ID
    tags = Column(JSON, default=list)
    is_active = Column(Boolean, default=True, index=True)
    first_seen = Column(DateTime, default=datetime.utcnow)
    last_seen = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)
