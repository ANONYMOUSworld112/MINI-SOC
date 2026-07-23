# 📖 User Guide — Sentinel SOC Platform

## Table of Contents

- [Getting Started](#getting-started)
- [Navigating the Platform](#navigating-the-platform)
- [Executive Dashboard](#executive-dashboard)
- [SOC Operations Dashboard](#soc-operations-dashboard)
- [Alert Management](#alert-management)
- [Incident Management](#incident-management)
- [MITRE ATT&CK Matrix](#mitre-attck-matrix)
- [Log Explorer (SIEM Search)](#log-explorer-siem-search)
- [Threat Intelligence](#threat-intelligence)
- [Threat Hunting](#threat-hunting)
- [Detection Rules](#detection-rules)
- [AI Security Copilot](#ai-security-copilot)
- [Asset Inventory](#asset-inventory)
- [System Health](#system-health)
- [Keyboard Shortcuts](#keyboard-shortcuts)

---

## Getting Started

### Logging In

1. Navigate to the platform URL (default: `http://localhost:3000`)
2. Enter your username and password
3. Click **Sign In**

### First-Time Setup

After logging in as an administrator:

1. Review and update the **Asset Inventory** with your infrastructure
2. Configure **Detection Rules** appropriate for your environment
3. Set up **Threat Intelligence** feeds
4. Verify **Collector Status** in System Health

---

## Navigating the Platform

### Sidebar Navigation

The left sidebar provides access to all platform modules:

| Section | Pages |
|---|---|
| **Overview** | Executive Dashboard, SOC Dashboard |
| **Security** | Alerts, Incidents, Detection Rules |
| **Intelligence** | MITRE ATT&CK, Threat Intel, Threat Hunting |
| **Assets** | Asset Inventory, Endpoints, Network |
| **System** | System Health, AI Copilot, Settings |

### Top Bar

- **Global Search**: Press `Ctrl+K` to quickly search across all entities
- **Notifications**: Bell icon shows unread alert notifications
- **Ingestion Rate**: Live events/second indicator
- **User Menu**: Profile, settings, and logout

---

## Executive Dashboard

The Executive Dashboard provides a high-level view of your organization's security posture.

### Key Metrics
- **Total Events (24h)**: Volume of log events ingested in the last 24 hours
- **Active Alerts**: Number of unresolved alerts requiring attention
- **Open Incidents**: Active security incidents being investigated
- **Risk Score**: Overall organizational risk posture (0-100)

### Visualizations
- **Event Ingestion Timeline**: 24-hour event volume trend
- **Alert Severity Distribution**: Breakdown of alerts by severity level
- **Top Targeted Assets**: Most frequently attacked assets
- **MITRE Coverage Summary**: Detection coverage across the ATT&CK framework

---

## SOC Operations Dashboard

Real-time operational view for SOC analysts.

### Features
- **Live Alert Stream**: Auto-scrolling feed of new alerts color-coded by severity
- **Analyst Workload**: Distribution of cases across team members
- **MTTR Gauge**: Mean Time to Respond metric
- **Alert Trends**: 7-day alert volume trend
- **Top Detection Rules**: Most frequently triggered rules
- **Geographic Origins**: Map showing attack source locations

---

## Alert Management

### Viewing Alerts
- Filter by severity (Critical, High, Medium, Low, Informational)
- Filter by status (New, Investigating, Resolved, False Positive)
- Filter by MITRE tactic or technique
- Sort by risk score, time, or severity

### Working an Alert

1. Click on an alert to view details
2. Review the **Risk Breakdown** (severity, confidence, asset criticality)
3. Check **MITRE Context** for technique information
4. View **Related Events** that triggered the alert
5. Take action:
   - **Acknowledge**: Mark as being reviewed
   - **Investigate**: Escalate for deeper analysis
   - **Resolve**: Close with resolution notes
   - **False Positive**: Mark to improve detection accuracy

### Bulk Operations
Select multiple alerts to perform bulk actions:
- Assign to analyst
- Change status
- Add to incident
- Export to CSV

---

## Incident Management

### Creating an Incident
1. Navigate to **Incidents**
2. Click **Create Incident**
3. Fill in title, description, severity
4. Assign to an analyst
5. Link related alerts

### Incident Workflow

```
New → Investigating → Containment → Eradication → Recovery → Resolved
                                                              ↓
                                                        False Positive
```

### Working a Case

#### Summary Tab
- Incident overview with severity, status, and SLA countdown
- Affected assets and related alerts
- Assigned analyst and escalation path

#### Timeline Tab
- Chronological view of all events related to the incident
- Auto-generated from correlated alerts and manual entries
- Add custom timeline entries for investigation milestones

#### Evidence Tab
- Attach evidence files (screenshots, logs, packet captures)
- Link related IOCs
- Document forensic findings

#### Notes Tab
- Add investigation notes with timestamps
- Tag other analysts with mentions
- Track investigation progress

---

## MITRE ATT&CK Matrix

### Interactive Matrix
The MITRE ATT&CK page displays a full interactive matrix with:

- **14 Tactic Columns**: Reconnaissance through Impact
- **Technique Cells**: Color-coded by detection status
  - 🔴 **Red**: Active alert from this technique
  - 🟠 **Amber**: Detection triggered in last 24h
  - 🔵 **Blue**: Detection rule exists (no recent activity)
  - ⬜ **Gray**: No detection coverage

### Technique Details
Click any technique to see:
- MITRE description
- Associated detection rules
- Recent alerts
- Related incidents
- Recommended detection improvements

### Coverage Statistics
- Overall coverage percentage
- Coverage by tactic
- Gap analysis with recommendations

---

## Log Explorer (SIEM Search)

### Search Interface
- **Full-text search** across all normalized log events
- **Field-specific filters**: source_type, severity, hostname, username, IP
- **Time range picker**: Preset ranges (15m, 1h, 4h, 24h, 7d) or custom

### Results View
- **Histogram**: Event distribution over the selected time range
- **Event Table**: Expandable rows showing normalized fields
- **Raw JSON**: Toggle to view the original raw log
- **Field Aggregation**: Sidebar showing top values per field

### Saved Searches
Save frequently used queries for quick access:
1. Build your search query
2. Click **Save Search**
3. Name your search and optionally add to favorites

---

## Threat Intelligence

### IOC Management
- Search and browse Indicators of Compromise (IOCs)
- Types: IP addresses, domains, URLs, file hashes, email addresses, CVEs
- Each IOC shows severity, source, first/last seen dates

### Threat Feeds
- View configured threat intelligence feed status
- Enable/disable feeds
- Track feed update timestamps

### Lookup
- Enter an indicator to check against all threat intelligence sources
- View reputation scores, associated campaigns, and related IOCs

---

## Threat Hunting

### Query Workspace
Build and execute hunt queries:
1. Select query type (IOC, MITRE, Timeline, Full-text)
2. Enter search criteria
3. Execute and review results
4. Bookmark interesting findings

### Saved Hunts
- Save successful hunt queries for reuse
- Organize by hunt hypothesis
- Generate hunt reports

---

## Detection Rules

### Managing Rules
- View all active and inactive detection rules
- Filter by severity, MITRE technique, or category
- Track rule performance metrics (matches, false positive rate)

### Creating a Rule
1. Navigate to **Detection Rules**
2. Click **Create Rule**
3. Enter rule definition in Sigma YAML format
4. Set severity and MITRE mappings
5. Click **Test Rule** to evaluate against historical data
6. Enable the rule for production detection

### Rule Performance
Monitor each rule's effectiveness:
- Match count (24h / 7d / 30d)
- False positive rate
- Mean time to detection

---

## AI Security Copilot

### Chat Interface
The AI Copilot provides intelligent investigation assistance:

- **Analyze Alert**: Paste an alert ID for detailed analysis
- **Explain Technique**: Ask about any MITRE ATT&CK technique
- **Summarize Incidents**: Get a summary of today's security events
- **Generate Reports**: Create executive or technical reports
- **Detection Recommendations**: Get suggestions for improving coverage

### Suggested Prompts
- "Analyze the latest critical alert"
- "Explain MITRE technique T1059"
- "What are today's top threats?"
- "Generate an executive summary for this week"
- "Suggest detection rules for lateral movement"

---

## Asset Inventory

### Managing Assets
- View all monitored assets with status indicators
- Filter by type (server, workstation, network device, cloud)
- Sort by criticality, department, or location
- Track agent status and patch level

### Asset Details
Click an asset to view:
- Configuration details
- Associated alerts and incidents
- Log event history
- Vulnerability information
- Criticality rating justification

---

## System Health

### Service Status
Monitor platform component health:
- API Server status
- Database connectivity
- Redis cache status
- Collector health

### Metrics
- **Ingestion Rate**: Events processed per second
- **Storage Usage**: Database and log storage consumption
- **Active Connections**: WebSocket and API connections
- **Uptime**: Service availability metrics

---

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl+K` | Global search |
| `Ctrl+/` | Toggle sidebar |
| `Esc` | Close modal/panel |
| `J` / `K` | Navigate list items |
| `Enter` | Open selected item |
| `?` | Show shortcuts help |
