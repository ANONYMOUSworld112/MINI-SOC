import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, JSON, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Incident(Base):
    __tablename__ = "incidents"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    description = Column(String)
    severity = Column(String, index=True)
    status = Column(String, default="new", index=True) # new, investigating, containment, eradication, recovery, resolved, false_positive
    assigned_to = Column(String, ForeignKey("users.id"), nullable=True)
    sla_deadline = Column(DateTime, nullable=True)
    affected_assets = Column(JSON, default=list)
    timeline = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    notes = relationship("IncidentNote", back_populates="incident", cascade="all, delete-orphan")
    evidence = relationship("IncidentEvidence", back_populates="incident", cascade="all, delete-orphan")
    alerts = relationship("Alert", primaryjoin="Alert.incident_id == Incident.id", foreign_keys="[Alert.incident_id]")

class IncidentNote(Base):
    __tablename__ = "incident_notes"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    incident_id = Column(String, ForeignKey("incidents.id"), nullable=False)
    author_id = Column(String, ForeignKey("users.id"), nullable=False)
    content = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    incident = relationship("Incident", back_populates="notes")

class IncidentEvidence(Base):
    __tablename__ = "incident_evidence"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    incident_id = Column(String, ForeignKey("incidents.id"), nullable=False)
    author_id = Column(String, ForeignKey("users.id"), nullable=False)
    evidence_type = Column(String) # file, url, text, screenshot
    content = Column(String) # S3 key, URL, or raw text
    description = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    incident = relationship("Incident", back_populates="evidence")
