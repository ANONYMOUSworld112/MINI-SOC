from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.database import get_db
from app.schemas.log_event import LogEventCreate, LogEventResponse, SearchQuery
from app.services.ingestion_service import IngestionService
from app.services.search_service import SearchService
from app.core.dependencies import get_current_user, require_role

router = APIRouter(prefix="/logs", tags=["Logs"])

@router.post("/ingest", response_model=LogEventResponse)
async def ingest_log(data: LogEventCreate, db: AsyncSession = Depends(get_db)):
    service = IngestionService(db)
    return await service.ingest_event(data)

@router.post("/search", response_model=List[LogEventResponse])
async def search_logs(query: SearchQuery, db: AsyncSession = Depends(get_db), user = Depends(require_role(["admin", "analyst_l1", "analyst_l2", "analyst_l3"]))):
    service = SearchService(db)
    return await service.search_events(query)
