# 🔧 API Reference — Sentinel SOC Platform

**Base URL**: `http://localhost:8000/api/v1`

**Authentication**: All endpoints except `/auth/login` require a valid JWT token in the `Authorization: Bearer <token>` header.

---

## Authentication

### POST /auth/login
Authenticate a user and receive JWT tokens.

**Request Body:**
```json
{
  "username": "admin",
  "password": "Admin@SOC2024!"
}
```

**Response (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer",
  "user": {
    "id": "uuid",
    "username": "admin",
    "email": "admin@soc.local",
    "role": "admin",
    "is_active": true
  }
}
```

### POST /auth/register
Create a new user (admin only).

**Request Body:**
```json
{
  "username": "analyst_new",
  "email": "analyst@soc.local",
  "password": "SecurePassword123!",
  "full_name": "New Analyst",
  "role": "analyst_l2"
}
```

### POST /auth/refresh
Refresh an expired access token.

**Request Body:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### GET /auth/me
Get current authenticated user profile.

---

## Assets

### GET /assets
List all assets with pagination and filtering.

**Query Parameters:**
| Parameter | Type | Description |
|---|---|---|
| `skip` | int | Offset (default: 0) |
| `limit` | int | Limit (default: 50) |
| `asset_type` | string | Filter by type (server/workstation/network/cloud) |
| `criticality` | int | Filter by criticality level (1-5) |
| `status` | string | Filter by status (active/inactive/maintenance) |
| `search` | string | Search hostname/IP |

**Response (200):**
```json
{
  "items": [
    {
      "id": "uuid",
      "hostname": "SRV-DC-01",
      "ip_address": "10.0.1.10",
      "asset_type": "server",
      "os": "Windows Server 2022",
      "criticality": 5,
      "department": "IT Infrastructure",
      "location": "Data Center A",
      "status": "active",
      "agent_version": "8.12.0",
      "last_seen": "2024-06-15T10:30:00Z"
    }
  ],
  "total": 25,
  "skip": 0,
  "limit": 50
}
```

### POST /assets
Create a new asset.

### GET /assets/{id}
Get asset details.

### PATCH /assets/{id}
Update asset.

### DELETE /assets/{id}
Delete asset (admin only).

---

## Alerts

### GET /alerts
List alerts with filtering and pagination.

**Query Parameters:**
| Parameter | Type | Description |
|---|---|---|
| `skip` | int | Offset |
| `limit` | int | Limit |
| `severity` | string | critical/high/medium/low/info |
| `status` | string | new/investigating/resolved/false_positive |
| `mitre_tactic` | string | MITRE tactic ID |
| `mitre_technique` | string | MITRE technique ID |
| `start_time` | datetime | Start of time range |
| `end_time` | datetime | End of time range |
| `sort_by` | string | risk_score/created_at/severity |

**Response (200):**
```json
{
  "items": [
    {
      "id": "uuid",
      "title": "Brute Force Attack Detected",
      "description": "Multiple failed login attempts from 185.220.101.42",
      "severity": "high",
      "confidence": 92,
      "risk_score": 78,
      "status": "new",
      "source": "detection",
      "detection_rule_id": "uuid",
      "mitre_tactic": "TA0006",
      "mitre_technique": "T1110",
      "affected_asset_id": "uuid",
      "affected_ip": "10.0.1.10",
      "affected_user": "admin",
      "event_count": 47,
      "created_at": "2024-06-15T08:30:00Z"
    }
  ],
  "total": 156
}
```

### GET /alerts/{id}
Get alert details including related events and MITRE context.

### PATCH /alerts/{id}
Update alert status or assignment.

**Request Body:**
```json
{
  "status": "investigating",
  "assigned_to": "uuid"
}
```

### GET /alerts/stats
Get alert statistics for dashboards.

**Response (200):**
```json
{
  "total_24h": 156,
  "by_severity": {"critical": 5, "high": 23, "medium": 67, "low": 61},
  "by_status": {"new": 45, "investigating": 23, "resolved": 78, "false_positive": 10},
  "trend_7d": [{"date": "2024-06-09", "count": 142}, ...],
  "top_mitre_techniques": [{"technique": "T1110", "count": 23}, ...],
  "top_targeted_assets": [{"asset": "SRV-DC-01", "count": 15}, ...]
}
```

---

## Incidents

### GET /incidents
List incidents.

### POST /incidents
Create a new incident.

**Request Body:**
```json
{
  "title": "Brute Force Campaign Against Domain Controller",
  "description": "Multiple brute force attempts detected against SRV-DC-01",
  "severity": "high",
  "assigned_to": "uuid",
  "related_alert_ids": ["uuid1", "uuid2"]
}
```

### GET /incidents/{id}
Get incident details.

### PATCH /incidents/{id}
Update incident.

### POST /incidents/{id}/notes
Add a note to an incident.

**Request Body:**
```json
{
  "content": "Confirmed malicious activity from external IP. Blocking at firewall.",
  "note_type": "investigation"
}
```

### GET /incidents/{id}/timeline
Get incident timeline.

---

## Log Events

### POST /logs/ingest
Ingest one or more log events.

**Request Body:**
```json
{
  "events": [
    {
      "timestamp": "2024-06-15T08:30:00Z",
      "source_type": "windows",
      "source_ip": "185.220.101.42",
      "dest_ip": "10.0.1.10",
      "hostname": "SRV-DC-01",
      "username": "admin",
      "event_id": "4625",
      "severity": "medium",
      "category": "authentication",
      "action": "logon_failure",
      "outcome": "failure",
      "raw_log": "An account failed to log on..."
    }
  ]
}
```

### GET /logs/search
Search log events.

**Query Parameters:**
| Parameter | Type | Description |
|---|---|---|
| `q` | string | Full-text search query |
| `source_type` | string | windows/linux/network/ids/cloud |
| `severity` | string | Severity filter |
| `hostname` | string | Hostname filter |
| `start_time` | datetime | Start time |
| `end_time` | datetime | End time |
| `skip` | int | Offset |
| `limit` | int | Limit |

### GET /logs/stats
Get ingestion statistics.

---

## Detection Rules

### GET /detections/rules
List detection rules.

### POST /detections/rules
Create a detection rule.

**Request Body:**
```json
{
  "name": "Suspicious PowerShell Execution",
  "description": "Detects PowerShell download cradles",
  "severity": "high",
  "sigma_rule": "title: Suspicious PowerShell...\ndetection:\n  selection:\n    ...",
  "mitre_tactics": ["TA0002"],
  "mitre_techniques": ["T1059.001"],
  "enabled": true
}
```

### POST /detections/rules/{id}/test
Test a rule against historical events.

### PATCH /detections/rules/{id}
Update a rule.

### DELETE /detections/rules/{id}
Delete a rule.

---

## MITRE ATT&CK

### GET /mitre/tactics
List all MITRE ATT&CK tactics.

### GET /mitre/techniques
List all techniques (optionally filtered by tactic).

### GET /mitre/matrix
Get the full coverage matrix for dashboard rendering.

**Response (200):**
```json
{
  "tactics": [
    {
      "id": "TA0001",
      "name": "Initial Access",
      "techniques": [
        {
          "id": "T1566",
          "name": "Phishing",
          "has_detection": true,
          "alert_count_24h": 3,
          "status": "active_alert"
        }
      ]
    }
  ],
  "coverage_percentage": 42.5,
  "total_techniques": 201,
  "covered_techniques": 85
}
```

### GET /mitre/coverage
Get coverage statistics.

---

## Threat Intelligence

### GET /threat-intel/iocs
List IOCs.

### POST /threat-intel/iocs
Create IOC.

### POST /threat-intel/lookup
Lookup an indicator.

**Request Body:**
```json
{
  "indicator": "185.220.101.42",
  "type": "ip"
}
```

### GET /threat-intel/feeds
List threat feeds.

---

## Dashboard

### GET /dashboard/executive
Executive dashboard data.

### GET /dashboard/soc
SOC operational dashboard data.

### GET /dashboard/system
System health dashboard data.

### GET /dashboard/metrics
Platform performance metrics.

---

## Search

### GET /search/global
Global search across all entity types.

**Query Parameters:**
| Parameter | Type | Description |
|---|---|---|
| `q` | string | Search query |
| `entity_types` | string | Comma-separated: alerts,incidents,assets,iocs |

---

## AI Copilot

### POST /copilot/analyze
Submit an analysis request.

**Request Body:**
```json
{
  "query": "Analyze the latest critical alert",
  "context": {
    "alert_id": "uuid",
    "include_mitre": true,
    "include_recommendations": true
  }
}
```

**Response (200):**
```json
{
  "analysis": {
    "summary": "This alert indicates a brute force attack...",
    "risk_assessment": "HIGH - Active credential attack against critical asset",
    "mitre_context": {
      "tactic": "Credential Access",
      "technique": "T1110 - Brute Force",
      "description": "..."
    },
    "recommended_actions": [
      "Block source IP at firewall",
      "Reset affected account password",
      "Enable account lockout policy"
    ],
    "investigation_steps": [
      "Check if the source IP appears in other events",
      "Verify if login was eventually successful",
      "Review affected account for unauthorized changes"
    ]
  }
}
```

---

## Health

### GET /health
Platform health check.

**Response (200):**
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "uptime_seconds": 86400,
  "database": "connected",
  "services": {
    "detection_engine": "running",
    "correlation_engine": "running",
    "ingestion": "running"
  }
}
```

---

## WebSocket

### WS /ws/live-feed
Real-time event stream.

**Messages sent by server:**
```json
{
  "type": "new_alert",
  "data": {
    "id": "uuid",
    "title": "Brute Force Attack Detected",
    "severity": "high",
    "risk_score": 78,
    "timestamp": "2024-06-15T08:30:00Z"
  }
}
```

```json
{
  "type": "ingestion_metrics",
  "data": {
    "events_per_second": 142,
    "total_events_24h": 1250000,
    "active_collectors": 12
  }
}
```

```json
{
  "type": "system_status",
  "data": {
    "status": "healthy",
    "cpu_usage": 45.2,
    "memory_usage": 62.8,
    "disk_usage": 38.5
  }
}
```
