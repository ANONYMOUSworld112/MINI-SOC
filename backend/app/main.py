from fastapi import FastAPI, Depends, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import asyncio

from app.config import settings
from app.database import engine, Base, AsyncSessionLocal
from app.core.middleware import RequestLoggingMiddleware, setup_exception_handlers
from app.core.websocket_manager import manager
from app.seeds.seed_data import seed_all
from app.simulator.event_generator import simulator_instance

# Import ALL routers
from app.api.auth import router as auth_router
from app.api.log_events import router as logs_router
from app.api.alerts import router as alerts_router
from app.api.incidents import router as incidents_router
from app.api.dashboard import router as dashboard_router
from app.api.copilot import router as copilot_router
from app.api.assets import router as assets_router
from app.api.detections import router as detections_router
from app.api.correlation import router as correlation_router
from app.api.threat_intel import router as threat_intel_router
from app.api.mitre import router as mitre_router
from app.api.search import router as search_router
from app.api.health import router as health_router
from app.api.audit import router as audit_router
from app.api.notifications import router as notifications_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # 1. Create tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        
    # 2. Seed data
    async with AsyncSessionLocal() as db:
        await seed_all(db)
        
    # 3. Start simulator in background
    # Only if configured, but we will start it by default for the demo
    sim_task = asyncio.create_task(simulator_instance.run())
    
    yield
    
    # 4. Shutdown
    simulator_instance.stop()
    await sim_task
    await engine.dispose()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Custom Middleware
app.add_middleware(RequestLoggingMiddleware)
setup_exception_handlers(app)

# Include Routers
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(logs_router, prefix=settings.API_V1_STR)
app.include_router(alerts_router, prefix=settings.API_V1_STR)
app.include_router(incidents_router, prefix=settings.API_V1_STR)
app.include_router(dashboard_router, prefix=settings.API_V1_STR)
app.include_router(copilot_router, prefix=settings.API_V1_STR)
app.include_router(assets_router, prefix=settings.API_V1_STR)
app.include_router(detections_router, prefix=settings.API_V1_STR)
app.include_router(correlation_router, prefix=settings.API_V1_STR)
app.include_router(threat_intel_router, prefix=settings.API_V1_STR)
app.include_router(mitre_router, prefix=settings.API_V1_STR)
app.include_router(search_router, prefix=settings.API_V1_STR)
app.include_router(health_router, prefix=settings.API_V1_STR)
app.include_router(audit_router, prefix=settings.API_V1_STR)
app.include_router(notifications_router, prefix=settings.API_V1_STR)

@app.websocket("/ws/live-feed")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)
