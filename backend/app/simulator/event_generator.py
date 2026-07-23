import asyncio
import random
import logging
from datetime import datetime
from app.database import AsyncSessionLocal
from app.schemas.log_event import LogEventCreate
from app.services.ingestion_service import IngestionService

logger = logging.getLogger(__name__)

class Simulator:
    def __init__(self):
        self.running = False
        self.ips = ["10.0.1.101", "10.0.1.102", "10.0.0.10", "192.168.1.5"]
        self.users = ["jsmith", "admin", "svc_account", "guest"]

    async def generate_normal_event(self):
        event = LogEventCreate(
            timestamp=datetime.utcnow(),
            source_type=random.choice(["windows", "linux", "network"]),
            source_ip=random.choice(self.ips),
            dest_ip="8.8.8.8",
            username=random.choice(self.users),
            event_id=random.choice(["4624", "4688", "1"]),
            severity="info",
            raw_log="Generated background noise event",
        )
        return event

    async def generate_attack_event(self):
        # Brute force attempt
        event = LogEventCreate(
            timestamp=datetime.utcnow(),
            source_type="windows",
            source_ip="185.20.50.10", # Known malicious IP from seed
            dest_ip="10.0.0.10",
            username="admin",
            event_id="4625",
            outcome="failure",
            severity="high",
            raw_log="Failed logon attempt",
        )
        return event

    async def run(self):
        self.running = True
        logger.info("Simulator started")
        
        while self.running:
            try:
                # 90% normal, 10% attack
                if random.random() < 0.1:
                    event = await self.generate_attack_event()
                else:
                    event = await self.generate_normal_event()
                    
                async with AsyncSessionLocal() as db:
                    ingestion = IngestionService(db)
                    await ingestion.ingest_event(event)
                    
            except Exception as e:
                logger.error(f"Simulator error: {e}")
                
            await asyncio.sleep(random.uniform(2.0, 5.0))

    def stop(self):
        self.running = False
        logger.info("Simulator stopped")

simulator_instance = Simulator()
