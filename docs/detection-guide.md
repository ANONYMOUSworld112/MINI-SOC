# 🔍 Detection Rules & MITRE ATT&CK Guide

## Table of Contents

- [Sigma Detection Rules](#sigma-detection-rules)
- [Correlation Rules](#correlation-rules)
- [MITRE ATT&CK Mapping](#mitre-attck-mapping)
- [Risk Scoring Methodology](#risk-scoring-methodology)
- [Writing Custom Rules](#writing-custom-rules)

---

## Sigma Detection Rules

### Overview

The platform uses Sigma-compatible detection rules to identify suspicious activity. Each rule is defined in YAML format and evaluated against normalized log events in real-time.

### Rule Format

```yaml
title: Suspicious PowerShell Download Cradle
id: 3b6ab547-8ec2-4991-b9f2-2f3d6e7c8a44
status: production
description: Detects PowerShell commands commonly used to download and execute payloads
references:
  - https://attack.mitre.org/techniques/T1059/001/
author: SOC Team
date: 2024/01/15
modified: 2024/06/01
tags:
  - attack.execution
  - attack.t1059.001
  - attack.t1105
logsource:
  category: process_creation
  product: windows
detection:
  selection:
    process_name|endswith: 'powershell.exe'
    command_line|contains|all:
      - 'Net.WebClient'
      - 'DownloadString'
  condition: selection
falsepositives:
  - Legitimate software updates
  - Admin scripts
level: high
```

### Built-in Rules

| Rule | MITRE Technique | Severity |
|---|---|---|
| Brute Force Login Attempt | T1110 | High |
| Suspicious PowerShell Execution | T1059.001 | High |
| Lateral Movement via PsExec | T1570 | Critical |
| Credential Dumping (Mimikatz) | T1003 | Critical |
| New Service Installation | T1543.003 | Medium |
| Scheduled Task Creation | T1053.005 | Medium |
| Registry Run Key Modification | T1547.001 | High |
| Suspicious Network Connection | T1071 | Medium |
| DNS Tunneling Activity | T1071.004 | High |
| Data Exfiltration via HTTP | T1048 | Critical |

---

## Correlation Rules

### Overview

Correlation rules detect complex multi-event attack patterns by tracking sequences of related events within configurable time windows.

### Example: Brute Force → Successful Login

```json
{
  "name": "Brute Force Followed by Successful Login",
  "description": "Detects 5+ failed login attempts followed by a successful login from the same source within 5 minutes",
  "conditions": [
    {
      "event_filter": {"event_id": "4625", "source_type": "windows"},
      "count": ">=5",
      "group_by": ["source_ip"]
    },
    {
      "event_filter": {"event_id": "4624", "source_type": "windows"},
      "count": ">=1",
      "group_by": ["source_ip"]
    }
  ],
  "time_window_seconds": 300,
  "severity": "high",
  "mitre_tactic": "TA0006",
  "mitre_technique": "T1110"
}
```

### Example: Suspicious Process → Outbound Connection

```json
{
  "name": "Suspicious Process with Outbound Connection",
  "description": "Detects unusual process execution followed by outbound network connection to external IP",
  "conditions": [
    {
      "event_filter": {
        "event_id": "1",
        "source_type": "windows",
        "process_name|in": ["powershell.exe", "cmd.exe", "wscript.exe", "cscript.exe", "mshta.exe"]
      },
      "count": ">=1",
      "group_by": ["hostname"]
    },
    {
      "event_filter": {
        "category": "network_connection",
        "dest_ip|not_in": ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16"]
      },
      "count": ">=1",
      "group_by": ["hostname"]
    }
  ],
  "time_window_seconds": 120,
  "severity": "high",
  "mitre_tactic": "TA0011",
  "mitre_technique": "T1071"
}
```

### Example: Privilege Escalation → Persistence

```json
{
  "name": "Privilege Escalation Followed by Persistence",
  "description": "Detects privilege escalation followed by persistence mechanism creation",
  "conditions": [
    {
      "event_filter": {"event_id|in": ["4672", "4624"], "source_type": "windows"},
      "count": ">=1",
      "group_by": ["username"]
    },
    {
      "event_filter": {"event_id|in": ["4698", "7045"], "source_type": "windows"},
      "count": ">=1",
      "group_by": ["hostname"]
    }
  ],
  "time_window_seconds": 600,
  "severity": "critical",
  "mitre_tactic": "TA0003",
  "mitre_technique": "T1543"
}
```

---

## MITRE ATT&CK Mapping

### Coverage Matrix

The platform maps detections to the MITRE ATT&CK framework. The interactive matrix shows:

- **Gray**: No detection coverage
- **Blue**: Detection rule exists
- **Amber**: Rule triggered in last 24h
- **Red**: Active alert from this technique

### Tactic Coverage

| Tactic | ID | Detection Rules |
|---|---|---|
| Reconnaissance | TA0043 | Port scanning, DNS enumeration |
| Resource Development | TA0042 | Infrastructure acquisition indicators |
| Initial Access | TA0001 | Phishing, exploitation, valid accounts |
| Execution | TA0002 | PowerShell, cmd, scripting engines |
| Persistence | TA0003 | Run keys, scheduled tasks, services |
| Privilege Escalation | TA0004 | Token manipulation, UAC bypass |
| Defense Evasion | TA0005 | Obfuscation, log clearing, masquerading |
| Credential Access | TA0006 | Brute force, credential dumping |
| Discovery | TA0007 | Network scanning, account discovery |
| Lateral Movement | TA0008 | RDP, PsExec, SMB |
| Collection | TA0009 | Screen capture, keylogging |
| Command and Control | TA0011 | DNS tunneling, HTTP C2, beaconing |
| Exfiltration | TA0010 | HTTP upload, DNS exfil, cloud storage |
| Impact | TA0040 | Encryption, wiper, defacement |

---

## Risk Scoring Methodology

### Formula

```
Risk Score = min(100, (Severity × Weight + Confidence × 0.2 + Asset Criticality × 0.2
            + Threat Intel Score × 0.15 + Behavioral Score × 0.1) × Impact Multiplier)
```

### Component Weights

| Component | Weight | Range | Description |
|---|---|---|---|
| Severity | 0.35 | 0-40 | Critical=40, High=30, Medium=20, Low=10 |
| Confidence | 0.20 | 0-100 | Detection confidence percentage |
| Asset Criticality | 0.20 | 1-5 | Business importance of affected asset |
| Threat Intel | 0.15 | 0-20 | IOC match bonus |
| Behavioral | 0.10 | 0-15 | Anomaly detection contribution |

### Impact Multiplier

| Condition | Multiplier |
|---|---|
| Domain Controller affected | 1.5 |
| Database server affected | 1.3 |
| Internet-facing system | 1.2 |
| Standard workstation | 1.0 |

---

## Writing Custom Rules

### Step 1: Define the Detection Logic

```yaml
title: My Custom Detection Rule
description: Describe what this rule detects
logsource:
  category: process_creation
  product: windows
detection:
  selection:
    field_name: value
  condition: selection
level: medium
```

### Step 2: Add MITRE Mapping

```yaml
tags:
  - attack.tactic_name
  - attack.technique_id
```

### Step 3: Test the Rule

1. Navigate to **Detection Rules** in the dashboard
2. Click **Create Rule**
3. Paste your Sigma YAML
4. Click **Test Rule** to evaluate against historical logs
5. Review matches and adjust as needed
6. Enable the rule for production detection

### Step 4: Monitor Performance

Track your rule's performance metrics:
- Match count (last 24h/7d/30d)
- False positive rate
- Mean time to detection
- Associated alerts and incidents
