from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.database import get_db
from app.schemas.asset import AssetCreate, AssetUpdate, AssetResponse, AssetGroupCreate, AssetGroupResponse
from app.services.asset_service import AssetService
from app.core.dependencies import get_current_user, require_role

router = APIRouter(prefix="/assets", tags=["Assets"])

@router.get("", response_model=List[AssetResponse])
async def list_assets(db: AsyncSession = Depends(get_db), user = Depends(get_current_user)):
    service = AssetService(db)
    return await service.get_assets()

@router.post("", response_model=AssetResponse)
async def create_asset(data: AssetCreate, db: AsyncSession = Depends(get_db), user = Depends(require_role(["admin", "soc_manager", "analyst_l3"]))):
    service = AssetService(db)
    return await service.create_asset(data)

@router.patch("/{id}", response_model=AssetResponse)
async def update_asset(id: str, data: AssetUpdate, db: AsyncSession = Depends(get_db), user = Depends(require_role(["admin", "soc_manager", "analyst_l3"]))):
    service = AssetService(db)
    return await service.update_asset(id, data)

@router.get("/groups", response_model=List[AssetGroupResponse])
async def list_groups(db: AsyncSession = Depends(get_db), user = Depends(get_current_user)):
    service = AssetService(db)
    return await service.get_groups()

@router.post("/groups", response_model=AssetGroupResponse)
async def create_group(data: AssetGroupCreate, db: AsyncSession = Depends(get_db), user = Depends(require_role(["admin", "soc_manager"]))):
    service = AssetService(db)
    return await service.create_group(data)
