import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime, JSON
from app.database import Base

class LogEvent(Base):
    __tablename__ = "log_events"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
    source_type = Column(String, index=True) # windows, linux, network, ids, cloud
    source_ip = Column(String, index=True, nullable=True)
    dest_ip = Column(String, index=True, nullable=True)
    source_port = Column(Integer, nullable=True)
    dest_port = Column(Integer, nullable=True)
    hostname = Column(String, index=True, nullable=True)
    username = Column(String, index=True, nullable=True)
    process_name = Column(String, nullable=True)
    process_id = Column(String, nullable=True)
    parent_process = Column(String, nullable=True)
    command_line = Column(String, nullable=True)
    event_id = Column(String, index=True, nullable=True)
    severity = Column(String, index=True) # critical, high, medium, low, info
    category = Column(String, index=True)
    action = Column(String, nullable=True)
    outcome = Column(String, nullable=True) # success, failure
    raw_log = Column(String)
    geo_country = Column(String, nullable=True)
    geo_city = Column(String, nullable=True)
    asset_id = Column(String, index=True, nullable=True)
    tags = Column(JSON, nullable=True)
    mitre_tactic = Column(String, nullable=True)
    mitre_technique = Column(String, nullable=True)
