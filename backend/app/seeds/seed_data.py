import logging
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.user import User
from app.models.mitre import MitreTactic, MitreTechnique
from app.models.detection_rule import DetectionRule
from app.models.asset import Asset
from app.models.threat_intel import IOC
from app.core.security import get_password_hash
from app.seeds.mitre_data import TACTICS, TECHNIQUES
from app.seeds.sigma_rules import RULES
from app.seeds.sample_assets import ASSETS
from app.seeds.sample_threats import IOCS

logger = logging.getLogger(__name__)

async def seed_all(db: AsyncSession):
    # Check if we need to seed
    result = await db.execute(select(User).limit(1))
    if result.scalars().first():
        logger.info("Database already seeded.")
        return

    logger.info("Seeding database...")
    
    # 1. Users
    users = [
        User(email="admin@soc.local", hashed_password=get_password_hash("admin123"), full_name="Admin User", role="admin"),
        User(email="manager@soc.local", hashed_password=get_password_hash("manager123"), full_name="SOC Manager", role="soc_manager"),
        User(email="l3@soc.local", hashed_password=get_password_hash("l3123"), full_name="Tier 3 Analyst", role="analyst_l3"),
        User(email="l2@soc.local", hashed_password=get_password_hash("l2123"), full_name="Tier 2 Analyst", role="analyst_l2"),
        User(email="l1@soc.local", hashed_password=get_password_hash("l1123"), full_name="Tier 1 Analyst", role="analyst_l1"),
        User(email="audit@soc.local", hashed_password=get_password_hash("audit123"), full_name="Auditor", role="auditor"),
    ]
    db.add_all(users)
    
    # 2. MITRE
    for t in TACTICS:
        db.add(MitreTactic(**t))
    for t in TECHNIQUES:
        db.add(MitreTechnique(**t))
        
    # 3. Assets
    for a in ASSETS:
        db.add(Asset(**a))
        
    # 4. Rules
    for r in RULES:
        db.add(DetectionRule(**r))
        
    # 5. IOCs
    for i in IOCS:
        db.add(IOC(**i))
        
    await db.commit()
    logger.info("Seeding complete.")
