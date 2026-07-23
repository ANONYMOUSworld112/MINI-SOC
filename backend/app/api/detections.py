from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.database import get_db
from app.schemas.detection import RuleCreate, RuleUpdate, RuleResponse
from app.models.detection_rule import DetectionRule
from app.core.dependencies import get_current_user, require_role

router = APIRouter(prefix="/detections", tags=["Detections"])

@router.get("/rules", response_model=List[RuleResponse])
async def list_rules(db: AsyncSession = Depends(get_db), user = Depends(get_current_user)):
    result = await db.execute(select(DetectionRule))
    return result.scalars().all()

@router.post("/rules", response_model=RuleResponse)
async def create_rule(data: RuleCreate, db: AsyncSession = Depends(get_db), user = Depends(require_role(["admin", "soc_manager", "analyst_l3"]))):
    rule = DetectionRule(**data.model_dump())
    db.add(rule)
    await db.commit()
    await db.refresh(rule)
    return rule

@router.patch("/rules/{id}", response_model=RuleResponse)
async def update_rule(id: str, data: RuleUpdate, db: AsyncSession = Depends(get_db), user = Depends(require_role(["admin", "soc_manager", "analyst_l3"]))):
    result = await db.execute(select(DetectionRule).where(DetectionRule.id == id))
    rule = result.scalars().first()
    if not rule:
        raise HTTPException(status_code=404, detail="Rule not found")
        
    update_data = data.model_dump(exclude_unset=True)
    for k, v in update_data.items():
        setattr(rule, k, v)
        
    await db.commit()
    await db.refresh(rule)
    return rule
