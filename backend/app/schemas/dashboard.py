from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class TimeSeriesData(BaseModel):
    timestamp: str
    value: int

class DashboardStats(BaseModel):
    total_events_24h: int
    active_incidents: int
    critical_alerts: int
    risk_posture_score: int
    alerts_by_severity: Dict[str, int]
    alerts_by_status: Dict[str, int]
    top_targeted_assets: List[Dict[str, Any]]
    events_trend: List[TimeSeriesData]
    ingestion_rate: float
