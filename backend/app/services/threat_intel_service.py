from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from app.models.threat_intel import IOC

class ThreatIntelService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def check_iocs(self, event) -> list:
        # Check source IP, dest IP, url/hash in tags
        values_to_check = []
        if getattr(event, 'source_ip', None):
            values_to_check.append(event.source_ip)
        if getattr(event, 'dest_ip', None):
            values_to_check.append(event.dest_ip)
        
        if getattr(event, 'tags', None):
            if 'hash' in event.tags:
                values_to_check.append(event.tags['hash'])
            if 'url' in event.tags:
                values_to_check.append(event.tags['url'])
                
        if not values_to_check:
            return []
            
        result = await self.db.execute(
            select(IOC).where(
                IOC.is_active == True,
                IOC.value.in_(values_to_check)
            )
        )
        return result.scalars().all()
