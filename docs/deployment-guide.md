# 🚀 Deployment Guide — Sentinel SOC Platform

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Docker Compose Deployment](#docker-compose-deployment)
- [Local Development Setup](#local-development-setup)
- [Configuration Reference](#configuration-reference)
- [Security Hardening](#security-hardening)
- [Performance Tuning](#performance-tuning)
- [Maintenance](#maintenance)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Docker Deployment
- Docker Engine 24.0+
- Docker Compose v2.20+
- Minimum 4 GB RAM
- 10 GB disk space
- Ports 3000, 8000 available

### Local Development
- Python 3.11+
- Node.js 18+
- npm 9+
- Git

---

## Quick Start

```bash
# 1. Clone and enter project
cd mini-soc

# 2. Copy environment configuration
cp .env.example .env

# 3. Start all services
docker-compose up --build -d

# 4. Verify services
docker-compose ps

# 5. Access the platform
# Dashboard:  http://localhost:3000
# API:        http://localhost:8000
# API Docs:   http://localhost:8000/docs
```

Login with default admin credentials:
- **Username**: `admin`
- **Password**: `Admin@SOC2024!`

---

## Docker Compose Deployment

### Build & Start

```bash
# Build and start in detached mode
docker-compose up --build -d

# View all service logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: deletes data)
docker-compose down -v
```

### Service Health Checks

```bash
# Check service status
docker-compose ps

# Backend health
curl http://localhost:8000/api/v1/health

# Frontend
curl http://localhost:3000
```

### Scaling

```bash
# Scale backend instances (behind load balancer)
docker-compose up --scale backend=3 -d
```

---

## Local Development Setup

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
.\venv\Scripts\activate

# Activate (Linux/macOS)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start with hot reload
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend will:
1. Auto-create SQLite database (`soc_platform.db`)
2. Create all tables
3. Seed initial data (users, assets, rules, MITRE data)
4. Start the telemetry simulator

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Access at http://localhost:3000

---

## Configuration Reference

### Environment Variables

| Variable | Default | Description |
|---|---|---|
| `APP_ENV` | `development` | Environment (development/production) |
| `APP_DEBUG` | `true` | Enable debug mode |
| `DATABASE_URL` | SQLite | Database connection string |
| `POSTGRES_DB` | `soc_platform` | PostgreSQL database name |
| `POSTGRES_USER` | `soc_admin` | PostgreSQL username |
| `POSTGRES_PASSWORD` | `S0c_Pl@tf0rm_2024!` | PostgreSQL password |
| `REDIS_PASSWORD` | `R3d1s_S0c_2024!` | Redis password |
| `JWT_SECRET_KEY` | (generated) | JWT signing secret |
| `JWT_ACCESS_TOKEN_EXPIRE_MINUTES` | `15` | Access token TTL |
| `JWT_REFRESH_TOKEN_EXPIRE_DAYS` | `7` | Refresh token TTL |
| `CORS_ORIGINS` | `["http://localhost:3000"]` | Allowed CORS origins |
| `ENABLE_SIMULATOR` | `true` | Enable telemetry simulator |
| `ENABLE_SEED_DATA` | `true` | Seed database on first run |
| `SIMULATOR_INTERVAL_SECONDS` | `30` | Simulator event interval |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | Backend API URL |
| `NEXT_PUBLIC_WS_URL` | `ws://localhost:8000` | WebSocket URL |

---

## Security Hardening

### Production Checklist

- [ ] Change all default passwords
- [ ] Generate strong JWT secret: `openssl rand -hex 64`
- [ ] Enable HTTPS with valid TLS certificates
- [ ] Restrict CORS to specific origins
- [ ] Set `APP_DEBUG=false`
- [ ] Set `APP_ENV=production`
- [ ] Use strong PostgreSQL password
- [ ] Enable Redis authentication
- [ ] Configure firewall rules
- [ ] Limit Docker container capabilities
- [ ] Enable audit logging
- [ ] Review RBAC role assignments
- [ ] Set up log rotation
- [ ] Configure backup schedule

### TLS Configuration

```bash
# Generate self-signed certificate (development)
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ssl/server.key \
  -out ssl/server.crt

# Production: Use Let's Encrypt or corporate CA
```

---

## Performance Tuning

### PostgreSQL

```sql
-- Recommended settings for SOC workload
ALTER SYSTEM SET shared_buffers = '1GB';
ALTER SYSTEM SET effective_cache_size = '3GB';
ALTER SYSTEM SET work_mem = '64MB';
ALTER SYSTEM SET maintenance_work_mem = '256MB';
ALTER SYSTEM SET max_connections = 200;
ALTER SYSTEM SET random_page_cost = 1.1;
```

### Backend

```bash
# Production uvicorn with multiple workers
uvicorn app.main:app \
  --host 0.0.0.0 \
  --port 8000 \
  --workers 4 \
  --loop uvloop \
  --http httptools
```

### Redis

```
# redis.conf
maxmemory 512mb
maxmemory-policy allkeys-lru
```

---

## Maintenance

### Database Backup

```bash
# Backup PostgreSQL
docker exec soc-postgres pg_dump -U soc_admin soc_platform > backup_$(date +%Y%m%d).sql

# Restore
docker exec -i soc-postgres psql -U soc_admin soc_platform < backup_20240101.sql
```

### Log Rotation

```bash
# Docker log rotation (daemon.json)
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m",
    "max-file": "5"
  }
}
```

### Updates

```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose up --build -d
```

---

## Troubleshooting

### Common Issues

**Backend won't start**
```bash
# Check logs
docker-compose logs backend

# Verify database connectivity
docker exec soc-backend python -c "from app.database import engine; print('OK')"
```

**Frontend can't reach API**
```bash
# Verify backend is running
curl http://localhost:8000/api/v1/health

# Check CORS configuration
# Ensure NEXT_PUBLIC_API_URL matches the backend URL
```

**Database connection errors**
```bash
# Check PostgreSQL status
docker exec soc-postgres pg_isready

# Verify credentials
docker exec soc-postgres psql -U soc_admin -d soc_platform -c "SELECT 1"
```

**High memory usage**
```bash
# Check container resource usage
docker stats

# Reduce simulator frequency
SIMULATOR_INTERVAL_SECONDS=60
```

**WebSocket disconnections**
```bash
# Check WebSocket endpoint
wscat -c ws://localhost:8000/api/v1/ws/live-feed

# Verify no proxy timeout issues
```
