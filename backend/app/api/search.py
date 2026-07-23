from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/search", tags=["Search"])

@router.get("")
async def global_search(q: str, db: AsyncSession = Depends(get_db), user = Depends(get_current_user)):
    return {"results": [], "query": q, "message": "Search not fully implemented"}
