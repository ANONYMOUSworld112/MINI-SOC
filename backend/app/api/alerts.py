from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from typing import List
from app.database import get_db
from app.schemas.alert import AlertResponse, AlertUpdate, AlertStats
from app.models.alert import Alert
from app.core.dependencies import get_current_user, require_role

router = APIRouter(prefix="/alerts", tags=["Alerts"])

@router.get("", response_model=List[AlertResponse])
async def list_alerts(db: AsyncSession = Depends(get_db), user = Depends(get_current_user)):
    result = await db.execute(select(Alert).order_by(desc(Alert.created_at)).limit(100))
    return result.scalars().all()

@router.get("/{id}", response_model=AlertResponse)
async def get_alert(id: str, db: AsyncSession = Depends(get_db), user = Depends(get_current_user)):
    result = await db.execute(select(Alert).where(Alert.id == id))
    alert = result.scalars().first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return alert

@router.patch("/{id}", response_model=AlertResponse)
async def update_alert(id: str, data: AlertUpdate, db: AsyncSession = Depends(get_db), user = Depends(require_role(["admin", "analyst_l2", "analyst_l3"]))):
    result = await db.execute(select(Alert).where(Alert.id == id))
    alert = result.scalars().first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
        
    update_data = data.model_dump(exclude_unset=True)
    for k, v in update_data.items():
        setattr(alert, k, v)
        
    await db.commit()
    await db.refresh(alert)
    return alert
