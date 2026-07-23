from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from app.database import get_db
from app.models.audit_log import AuditLog
from app.core.dependencies import get_current_user, require_role

router = APIRouter(prefix="/audit", tags=["Audit"])

@router.get("")
async def list_audit_logs(db: AsyncSession = Depends(get_db), user = Depends(require_role(["admin", "auditor"]))):
    result = await db.execute(select(AuditLog).order_by(desc(AuditLog.timestamp)).limit(100))
    return result.scalars().all()
