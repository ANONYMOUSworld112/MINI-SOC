from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.models.incident import Incident, IncidentNote
from app.schemas.incident import IncidentCreate, IncidentUpdate, IncidentNoteCreate
from app.core.exceptions import NotFoundException

class IncidentService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_all(self) -> List[Incident]:
        result = await self.db.execute(select(Incident))
        return result.scalars().all()

    async def create(self, data: IncidentCreate) -> Incident:
        incident = Incident(**data.model_dump())
        self.db.add(incident)
        await self.db.commit()
        await self.db.refresh(incident)
        return incident

    async def update(self, id: str, data: IncidentUpdate) -> Incident:
        result = await self.db.execute(select(Incident).where(Incident.id == id))
        incident = result.scalars().first()
        if not incident:
            raise NotFoundException("Incident not found")
            
        update_data = data.model_dump(exclude_unset=True)
        for k, v in update_data.items():
            setattr(incident, k, v)
            
        await self.db.commit()
        await self.db.refresh(incident)
        return incident

    async def add_note(self, incident_id: str, author_id: str, data: IncidentNoteCreate) -> IncidentNote:
        note = IncidentNote(
            incident_id=incident_id,
            author_id=author_id,
            content=data.content
        )
        self.db.add(note)
        await self.db.commit()
        await self.db.refresh(note)
        return note
