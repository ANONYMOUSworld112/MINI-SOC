from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional
from app.models.asset import Asset, AssetGroup
from app.schemas.asset import AssetCreate, AssetUpdate, AssetGroupCreate
from app.core.exceptions import NotFoundException

class AssetService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_assets(self) -> List[Asset]:
        result = await self.db.execute(select(Asset))
        return result.scalars().all()

    async def create_asset(self, data: AssetCreate) -> Asset:
        asset = Asset(**data.model_dump())
        self.db.add(asset)
        await self.db.commit()
        await self.db.refresh(asset)
        return asset

    async def update_asset(self, id: str, data: AssetUpdate) -> Asset:
        result = await self.db.execute(select(Asset).where(Asset.id == id))
        asset = result.scalars().first()
        if not asset:
            raise NotFoundException("Asset not found")
            
        update_data = data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(asset, key, value)
            
        await self.db.commit()
        await self.db.refresh(asset)
        return asset

    async def get_groups(self) -> List[AssetGroup]:
        result = await self.db.execute(select(AssetGroup))
        return result.scalars().all()
        
    async def create_group(self, data: AssetGroupCreate) -> AssetGroup:
        group = AssetGroup(**data.model_dump())
        self.db.add(group)
        await self.db.commit()
        await self.db.refresh(group)
        return group
