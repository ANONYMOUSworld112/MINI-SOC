from fastapi import APIRouter
from app.config import settings

router = APIRouter(tags=["Health"])

@router.get("/health")
async def check_health():
    return {"status": "ok", "service": settings.PROJECT_NAME}
