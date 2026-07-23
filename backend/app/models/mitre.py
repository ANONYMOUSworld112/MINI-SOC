import uuid
from datetime import datetime
from sqlalchemy import Column, String, JSON, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.database import Base

class MitreTactic(Base):
    __tablename__ = "mitre_tactics"

    id = Column(String, primary_key=True) # TA0001
    name = Column(String, nullable=False)
    description = Column(String)
    url = Column(String)
    
    techniques = relationship("MitreTechnique", back_populates="tactic")

class MitreTechnique(Base):
    __tablename__ = "mitre_techniques"

    id = Column(String, primary_key=True) # T1566
    tactic_id = Column(String, ForeignKey("mitre_tactics.id"))
    name = Column(String, nullable=False)
    description = Column(String)
    url = Column(String)
    platforms = Column(JSON, default=list)
    
    tactic = relationship("MitreTactic", back_populates="techniques")

class DetectionMapping(Base):
    __tablename__ = "detection_mappings"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    rule_id = Column(String, nullable=False)
    technique_id = Column(String, ForeignKey("mitre_techniques.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
