from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/notifications", tags=["Notifications"])

@router.get("/preferences")
async def get_preferences(user = Depends(get_current_user)):
    return {"email": True, "slack": False}
