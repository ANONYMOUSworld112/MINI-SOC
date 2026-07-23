from sqlalchemy.ext.asyncio import AsyncSession
from app.models.audit_log import AuditLog
import logging

logger = logging.getLogger(__name__)

class AuditService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def log_action(self, user_id: str, action: str, resource_type: str, resource_id: str = None, details: dict = None, ip_address: str = None):
        try:
            log = AuditLog(
                user_id=user_id,
                action=action,
                resource_type=resource_type,
                resource_id=resource_id,
                details=details or {},
                ip_address=ip_address
            )
            self.db.add(log)
            await self.db.commit()
        except Exception as e:
            logger.error(f"Failed to write audit log: {e}")
