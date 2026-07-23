from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class MitreTechniqueBase(BaseModel):
    id: str
    tactic_id: str
    name: str
    description: Optional[str] = None
    url: Optional[str] = None
    platforms: Optional[List[str]] = []

class MitreTechniqueResponse(MitreTechniqueBase):
    class Config:
        from_attributes = True

class MitreTacticBase(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    url: Optional[str] = None

class MitreTacticResponse(MitreTacticBase):
    techniques: List[MitreTechniqueResponse] = []

    class Config:
        from_attributes = True

class CoverageResponse(BaseModel):
    tactic_id: str
    tactic_name: str
    technique_id: str
    technique_name: str
    rule_count: int
    is_covered: bool
