from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.database import get_db
from app.schemas.threat_intel import IOCCreate, IOCResponse, ThreatFeedCreate, ThreatFeedResponse
from app.models.threat_intel import IOC, ThreatFeed
from app.core.dependencies import get_current_user, require_role

router = APIRouter(prefix="/threat-intel", tags=["Threat Intel"])

@router.get("/iocs", response_model=List[IOCResponse])
async def list_iocs(db: AsyncSession = Depends(get_db), user = Depends(get_current_user)):
    result = await db.execute(select(IOC))
    return result.scalars().all()

@router.post("/iocs", response_model=IOCResponse)
async def create_ioc(data: IOCCreate, db: AsyncSession = Depends(get_db), user = Depends(require_role(["admin", "soc_manager", "analyst_l3"]))):
    ioc = IOC(**data.model_dump())
    db.add(ioc)
    await db.commit()
    await db.refresh(ioc)
    return ioc

@router.get("/feeds", response_model=List[ThreatFeedResponse])
async def list_feeds(db: AsyncSession = Depends(get_db), user = Depends(get_current_user)):
    result = await db.execute(select(ThreatFeed))
    return result.scalars().all()

@router.post("/feeds", response_model=ThreatFeedResponse)
async def create_feed(data: ThreatFeedCreate, db: AsyncSession = Depends(get_db), user = Depends(require_role(["admin", "soc_manager"]))):
    feed = ThreatFeed(**data.model_dump())
    db.add(feed)
    await db.commit()
    await db.refresh(feed)
    return feed
