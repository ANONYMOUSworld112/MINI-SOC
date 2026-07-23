from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.database import get_db
from app.schemas.detection import CorrelationRuleCreate, CorrelationRuleResponse
from app.models.detection_rule import CorrelationRule
from app.core.dependencies import get_current_user, require_role

router = APIRouter(prefix="/correlation", tags=["Correlation"])

@router.get("/rules", response_model=List[CorrelationRuleResponse])
async def list_correlation_rules(db: AsyncSession = Depends(get_db), user = Depends(get_current_user)):
    result = await db.execute(select(CorrelationRule))
    return result.scalars().all()

@router.post("/rules", response_model=CorrelationRuleResponse)
async def create_correlation_rule(data: CorrelationRuleCreate, db: AsyncSession = Depends(get_db), user = Depends(require_role(["admin", "soc_manager", "analyst_l3"]))):
    rule = CorrelationRule(**data.model_dump())
    db.add(rule)
    await db.commit()
    await db.refresh(rule)
    return rule
