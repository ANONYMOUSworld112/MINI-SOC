from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.database import get_db
from app.schemas.mitre import MitreTacticResponse, MitreTechniqueResponse, CoverageResponse
from app.services.mitre_service import MitreService
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/mitre", tags=["MITRE"])

@router.get("/tactics", response_model=List[MitreTacticResponse])
async def list_tactics(db: AsyncSession = Depends(get_db), user = Depends(get_current_user)):
    service = MitreService(db)
    return await service.get_tactics()

@router.get("/techniques", response_model=List[MitreTechniqueResponse])
async def list_techniques(db: AsyncSession = Depends(get_db), user = Depends(get_current_user)):
    service = MitreService(db)
    return await service.get_techniques()

@router.get("/coverage", response_model=List[CoverageResponse])
async def get_coverage_matrix(db: AsyncSession = Depends(get_db), user = Depends(get_current_user)):
    service = MitreService(db)
    return await service.get_coverage_matrix()
