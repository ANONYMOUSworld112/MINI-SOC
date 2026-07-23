import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, DateTime, Boolean, Integer, JSON
from app.database import Base

class DetectionRule(Base):
    __tablename__ = "detection_rules"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    description = Column(String)
    severity = Column(String)
    sigma_rule = Column(String, nullable=False) # YAML text
    mitre_tactics = Column(JSON, default=list)
    mitre_techniques = Column(JSON, default=list)
    enabled = Column(Boolean, default=True)
    false_positive_rate = Column(Float, default=0.0)
    last_triggered = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class CorrelationRule(Base):
    __tablename__ = "correlation_rules"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    description = Column(String)
    conditions = Column(JSON, nullable=False) # List of event patterns
    time_window_seconds = Column(Integer, default=300)
    threshold = Column(Integer, default=1)
    mitre_tactic = Column(String, nullable=True)
    mitre_technique = Column(String, nullable=True)
    enabled = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
