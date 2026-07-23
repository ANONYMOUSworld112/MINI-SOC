from fastapi import APIRouter, Depends
from app.schemas.copilot import CopilotQuery, CopilotResponse
from app.services.copilot_service import CopilotService
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/copilot", tags=["Copilot"])

@router.post("/analyze", response_model=CopilotResponse)
async def analyze_with_copilot(query: CopilotQuery, user = Depends(get_current_user)):
    return CopilotService.analyze_query(query)
