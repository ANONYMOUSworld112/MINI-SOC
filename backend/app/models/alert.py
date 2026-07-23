import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime, JSON, Float, ForeignKey
from app.database import Base

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    description = Column(String)
    severity = Column(String, index=True) # critical, high, medium, low
    confidence = Column(Integer, default=50) # 0-100
    risk_score = Column(Float, index=True)
    status = Column(String, default="new", index=True) # new, investigating, resolved, false_positive
    source = Column(String) # detection, correlation, threat_intel
    detection_rule_id = Column(String, nullable=True)
    mitre_tactic = Column(String, nullable=True)
    mitre_technique = Column(String, nullable=True)
    affected_asset_id = Column(String, nullable=True)
    affected_ip = Column(String, nullable=True)
    affected_user = Column(String, nullable=True)
    event_ids = Column(JSON, default=list) # JSON array of log event IDs
    evidence = Column(JSON, default=dict) # JSON object of evidence data
    assigned_to = Column(String, ForeignKey("users.id"), nullable=True)
    incident_id = Column(String, ForeignKey("incidents.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
