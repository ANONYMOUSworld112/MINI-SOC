from pydantic import BaseModel
from typing import Optional, List

class CopilotQuery(BaseModel):
    query: str
    context: Optional[dict] = None

class CopilotResponse(BaseModel):
    summary: str
    risk_assessment: str
    mitre_context: List[str]
    recommended_actions: List[str]
    investigation_steps: List[str]
    similar_past_incidents: List[str]
