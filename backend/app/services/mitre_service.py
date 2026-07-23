from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.models.mitre import MitreTactic, MitreTechnique, DetectionMapping

class MitreService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_tactics(self) -> List[MitreTactic]:
        result = await self.db.execute(select(MitreTactic))
        return result.scalars().all()

    async def get_techniques(self) -> List[MitreTechnique]:
        result = await self.db.execute(select(MitreTechnique))
        return result.scalars().all()
        
    async def get_coverage_matrix(self) -> list:
        # Mocking coverage mapping for the prototype
        # Real impl would join MitreTactic, MitreTechnique, and DetectionMapping
        tactics_res = await self.db.execute(select(MitreTactic))
        tactics = tactics_res.scalars().all()
        
        matrix = []
        for tac in tactics:
            tech_res = await self.db.execute(select(MitreTechnique).where(MitreTechnique.tactic_id == tac.id))
            techs = tech_res.scalars().all()
            for tech in techs:
                # count mappings
                mapping_res = await self.db.execute(select(DetectionMapping).where(DetectionMapping.technique_id == tech.id))
                mappings = mapping_res.scalars().all()
                count = len(mappings)
                matrix.append({
                    "tactic_id": tac.id,
                    "tactic_name": tac.name,
                    "technique_id": tech.id,
                    "technique_name": tech.name,
                    "rule_count": count,
                    "is_covered": count > 0
                })
        return matrix
