from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_, desc
from typing import List
from app.models.log_event import LogEvent
from app.schemas.log_event import SearchQuery

class SearchService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def search_events(self, query: SearchQuery) -> List[LogEvent]:
        stmt = select(LogEvent).order_by(desc(LogEvent.timestamp))
        
        if query.query:
            # Simple wildcard search on text fields
            search_term = f"%{query.query}%"
            stmt = stmt.where(
                or_(
                    LogEvent.raw_log.ilike(search_term),
                    LogEvent.source_ip.ilike(search_term),
                    LogEvent.dest_ip.ilike(search_term),
                    LogEvent.username.ilike(search_term),
                    LogEvent.process_name.ilike(search_term),
                    LogEvent.command_line.ilike(search_term),
                )
            )
            
        if query.start_time:
            stmt = stmt.where(LogEvent.timestamp >= query.start_time)
            
        if query.end_time:
            stmt = stmt.where(LogEvent.timestamp <= query.end_time)
            
        stmt = stmt.offset(query.offset).limit(query.limit)
        
        result = await self.db.execute(stmt)
        return result.scalars().all()
