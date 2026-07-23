from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.database import get_db
from app.schemas.incident import IncidentCreate, IncidentResponse, IncidentUpdate, IncidentNoteCreate, IncidentNoteResponse
from app.services.incident_service import IncidentService
from app.core.dependencies import get_current_user, require_role

router = APIRouter(prefix="/incidents", tags=["Incidents"])

@router.get("", response_model=List[IncidentResponse])
async def list_incidents(db: AsyncSession = Depends(get_db), user = Depends(get_current_user)):
    service = IncidentService(db)
    return await service.get_all()

@router.post("", response_model=IncidentResponse)
async def create_incident(data: IncidentCreate, db: AsyncSession = Depends(get_db), user = Depends(require_role(["admin", "analyst_l2", "analyst_l3"]))):
    service = IncidentService(db)
    return await service.create(data)

@router.patch("/{id}", response_model=IncidentResponse)
async def update_incident(id: str, data: IncidentUpdate, db: AsyncSession = Depends(get_db), user = Depends(require_role(["admin", "analyst_l2", "analyst_l3"]))):
    service = IncidentService(db)
    return await service.update(id, data)

@router.post("/{id}/notes", response_model=IncidentNoteResponse)
async def add_note(id: str, data: IncidentNoteCreate, db: AsyncSession = Depends(get_db), user = Depends(get_current_user)):
    service = IncidentService(db)
    return await service.add_note(id, user.id, data)
