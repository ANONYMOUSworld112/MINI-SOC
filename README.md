# 🛡️ Sentinel SOC — Enterprise Security Operations Center Platform

<div align="center">

**A Production-Grade, MNC-Style Security Operations Platform for Monitoring Authorized Infrastructure**

[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Next.js 14](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Python 3.11+](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-7-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

*SIEM • XDR • SOAR • MITRE ATT&CK • Threat Intelligence • AI Copilot*

</div>

---

## 📋 Overview

**Sentinel SOC** is a modular, MNC-style Security Operations Center (SOC) platform engineered to collect, normalize, correlate, detect, and respond to threats across authorized enterprise infrastructure.

Designed after industry leaders such as **Microsoft Sentinel**, **CrowdStrike Falcon**, **Elastic Security**, and **Splunk Enterprise Security**, Sentinel SOC delivers an enterprise-ready pipeline completely built using modern open-source technologies.

---

## ✨ Key Features & Capabilities

- 📥 **Multi-Source Log Ingestion & Normalization**: Collects and parses telemetry from Windows Event Logs, Sysmon, Linux Syslog, Auditd, Suricata IDS, DNS, Firewall, and Cloud audit logs into a unified Elastic Common Schema (ECS).
- 🔍 **Sigma & YARA Detection Engine**: Evaluates Sigma-compatible YAML rules against incoming normalized events in real-time.
- ⚡ **Multi-Event Correlation Engine**: Dynamic time-window correlation linking related security events (e.g., brute force attempts followed by successful logon, or suspicious PowerShell execution spawning outbound network connections).
- 🗺️ **MITRE ATT&CK Heatmap**: Complete framework mapping covering all 14 tactics (TA0043 to TA0040) and 70+ techniques with live visual coverage matrices.
- 🎯 **Dynamic Risk Scoring**: Composite algorithm calculating composite risk per event based on severity, detection confidence, asset criticality, and threat intelligence IOC reputation.
- 💼 **Incident Case Management**: Full investigation lifecycle featuring Kanban boards, analyst assignment, SLA deadline countdowns, linear timelines, and evidence lockers.
- 🔎 **SIEM Log Explorer**: Powerful search workspace featuring query filters, histogram distributions, expandable records, and raw JSON inspectors.
- 🌐 **Threat Intelligence Hub**: Native IOC repository (IPs, Domains, Hashes, URLs) with feed health tracking and indicator enrichment.
- 🤖 **AI Security Copilot**: Contextual alert analysis, root cause guidance, MITRE technique explanations, and automated report generation.
- 🖥️ **16 Enterprise Dark-Theme Dashboards**: Executive Overview, SOC Operations Ticker, Asset Inventory, Endpoints Visibility, Network Intelligence, System Health, and Settings.
- 🧪 **Telemetry Simulator**: Built-in multi-vector attack generator simulating real-world adversary behavior (Windows 4624/4625/4688, SSH brute force, C2 beacons, Suricata alerts).

---

## 🏗️ Architecture

```text
┌─────────────────────────────────────────────────────────────────┐
│                     Authorized Telemetry Sources                │
│  Windows Events │ Sysmon │ Linux Syslog │ Suricata │ Network   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   FastAPI Log Ingestion Pipeline                │
│         Parsing → Validation → ECS Normalization                │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Enrichment Pipeline                        │
│    GeoIP │ Asset Correlation │ Threat Intel │ IOC Matching      │
└────────────────────────────┬────────────────────────────────────┘
                             │
              ┌──────────────┴──────────────┐
              ▼                             ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│   Sigma Detection Engine │  │   Correlation Engine     │
│  Rule Matching & Severity│  │  Time-Window Patterning  │
└─────────────┬────────────┘  └─────────────┬────────────┘
              └──────────────┬──────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              Risk Engine & MITRE ATT&CK Mapper                  │
│         Composite Scoring │ Technique Mapping                   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              Alert Generation & Incident Management             │
│    Case Creation │ Assignment │ SLA │ Evidence │ Timeline       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                Enterprise Dark SOC Dashboard                    │
│  Executive │ SOC │ MITRE │ Threat Intel │ Log Explorer │ Copilot│
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

| Domain | Technology | Purpose |
|---|---|---|
| **Backend** | Python 3.11+, FastAPI, AsyncIO | High-concurrency async REST API & WebSockets |
| **Database** | PostgreSQL 16 / Async SQLAlchemy 2.0 / SQLite | Relational data store, incidents, assets, detection rules |
| **Caching** | Redis 7 | Pub/Sub, real-time alert caching, session management |
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript | Production dark-themed SOC user interface |
| **Styling** | Tailwind CSS, Framer Motion | Cyberpunk / MNC dark mode aesthetic with glassmorphism |
| **Charts** | Recharts | Interactive time-series, histograms, and donut distributions |
| **Containerization** | Docker, Docker Compose | Microservice orchestration |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your host system:
- [Git](https://git-scm.com/)
- [Docker & Docker Compose](https://www.docker.com/) *(Recommended for 1-command deployment)*
- **OR** Python 3.11+ and Node.js 18+ *(For manual local setup)*

---

### Option 1: Docker Compose (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/sentinel-soc.git
   cd sentinel-soc
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```

3. **Build and start all services:**
   ```bash
   docker-compose up --build -d
   ```

4. **Verify container health:**
   ```bash
   docker-compose ps
   ```

5. **Access the application:**
   - 💻 **SOC Dashboard**: [http://localhost:3000](http://localhost:3000)
   - 🔌 **FastAPI Swagger Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
   - 🏥 **Health Check**: [http://localhost:8000/health](http://localhost:8000/health)

---

### Option 2: Manual Local Setup

#### 1. Backend Setup (FastAPI)

```bash
cd backend

# Create and activate virtual environment
python -m venv venv

# On Windows (PowerShell):
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# Install backend dependencies
pip install -r requirements.txt

# Start FastAPI application (SQLite database will auto-initialize & seed)
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### 2. Frontend Setup (Next.js)

Open a new terminal:
```bash
cd frontend

# Install dependencies
npm install

# Start Next.js development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Default Credentials

The platform initializes with pre-configured seed users across all RBAC tiers:

| Role | Username / Email | Password | Access Level |
|---|---|---|---|
| **Administrator** | `admin@soc.local` | `admin123` | Full Administrative & System Control |
| **SOC Manager** | `manager@soc.local` | `manager123` | Case Management, Rule Approvals, SOC Analytics |
| **Tier 3 Analyst** | `l3@soc.local` | `l3123` | Advanced Threat Hunting & Custom Sigma Creation |
| **Tier 2 Analyst** | `l2@soc.local` | `l2123` | Incident Remediation & Evidence Analysis |
| **Tier 1 Analyst** | `l1@soc.local` | `l1123` | Alert Triage & Initial Escalation |
| **Auditor** | `audit@soc.local` | `audit123` | Read-Only Audit Logging & Compliance |

---

## 📊 Platform Dashboards Overview

| Page / Route | Path | Key Highlights |
|---|---|---|
| **Executive Overview** | `/dashboard` | Overall security posture, risk score KPI, ingestion trends, top targeted assets |
| **SOC Operations** | `/soc` | Real-time auto-scrolling alert stream, MTTR metrics, analyst workload |
| **MITRE ATT&CK Matrix** | `/mitre` | Interactive 14-tactic heatmap grid with technique drilldowns |
| **Alert Management** | `/alerts` | Severity filterable alerts table with status workflow & MITRE tags |
| **Incident Workbench** | `/incidents` | Kanban case tracking (New → Investigating → Containment → Resolved) |
| **SIEM Log Explorer** | `/search` | Full-text log query workspace, time histogram, raw JSON view |
| **Threat Intelligence** | `/threat-intel` | Indicator repository (IP, Hash, Domain), threat actor mapping |
| **Threat Hunting** | `/hunt` | Query editor workspace, hunt hypothesis bookmarks |
| **Detection Rules** | `/detections` | Sigma rule management, test bench against historical logs |
| **AI Security Copilot** | `/copilot` | Interactive threat investigation assistant and report generator |
| **Asset Inventory** | `/assets` | Asset directory, criticality ratings, patch & agent tracking |
| **Endpoints Visibility** | `/endpoints` | Endpoint-level threat scores & host status |
| **Network Intelligence** | `/network` | IDS alert summaries, flow anomalies, topology status |
| **System Health** | `/health` | Live service health, collector EPS meters, storage metrics |

---

## 📁 Repository Structure

```text
sentinel-soc/
├── backend/                    # Python FastAPI Backend
│   ├── app/
│   │   ├── api/                # 16 REST API endpoints
│   │   ├── core/               # JWT auth, RBAC, WebSockets, middleware
│   │   ├── models/             # SQLAlchemy ORM database models
│   │   ├── schemas/            # Pydantic v2 schemas
│   │   ├── seeds/              # Database seeder (MITRE data, Sigma rules, assets, IOCs)
│   │   ├── services/           # 15 Business logic engines (Detection, Correlation, Risk)
│   │   └── simulator/          # Attack telemetry event generator
│   ├── main.py                 # FastAPI application entry point
│   ├── Dockerfile              # Backend container build specification
│   └── requirements.txt        # Python dependency manifest
├── frontend/                   # Next.js 14 React Frontend
│   ├── src/
│   │   ├── app/                # 16 App Router pages
│   │   ├── components/         # Glassmorphism cards, alert tickers, charts, MITRE matrix
│   │   ├── hooks/              # Custom React hooks (API, WebSockets, Debounce)
│   │   └── lib/                # Mock data engine, WebSocket client, API helper
│   ├── next.config.mjs         # Next.js configuration
│   ├── tailwind.config.ts      # Tailwind CSS dark theme design system
│   ├── package.json            # Node.js dependencies
│   └── Dockerfile              # Frontend container build specification
├── docs/                       # Complete Platform Documentation
│   ├── architecture.md         # Architecture, ER diagrams, data flow diagrams
│   ├── api-reference.md        # API endpoint specifications
│   ├── deployment-guide.md     # Deployment & security hardening instructions
│   ├── detection-guide.md      # Sigma rule writing & risk scoring guide
│   └── user-guide.md           # End-user operational playbook
├── rules/sigma/                # 8 Production-Ready Sigma Rules
│   ├── windows/                # Brute force, PowerShell download, Mimikatz, PsExec
│   ├── linux/                  # SSH brute force, sudo privilege escalation
│   └── network/                # IDS malware communication, DNS tunneling
├── docker-compose.yml          # Full-stack Docker Compose configuration
├── .env.example                # Environment variable configuration template
└── README.md                   # Repository README
```

---

## 🧪 Testing & Verification

### Running Backend Tests & Seeding Check
To verify backend database schema generation, ORM models, and seed data:
```bash
cd backend
python -c "import asyncio; from app.database import engine, Base; from app.seeds.seed_data import seed_all; from app.database import AsyncSessionLocal; async def run(): async with engine.begin() as c: await c.run_sync(Base.metadata.create_all); async with AsyncSessionLocal() as s: await seed_all(s); print('Backend Verification Successful!'); asyncio.run(run())"
```

### Running Frontend Production Build
To test Next.js type checking and static page compilation:
```bash
cd frontend
npm run build
```

---

## 🔒 Security Disclaimer

> [!IMPORTANT]
> **Sentinel SOC is designed exclusively for monitoring authorized infrastructure, endpoints, network devices, and cloud services that you own or have explicit written permission to administer.** Unauthorized monitoring or security testing of third-party systems is illegal. Always verify compliance and authorization before deploying security tools.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — see the LICENSE file for details.

---

<div align="center">

**Built with ❤️ for Security Engineers, Analysts, and DevSecOps Teams**

</div>
