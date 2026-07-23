RULES = [
    {
        "name": "Failed Login Burst (Brute Force)",
        "description": "Detects multiple failed login attempts in a short timeframe indicating possible brute force.",
        "severity": "high",
        "sigma_rule": "title: Failed Logins\ndetection:\n  selection:\n    event_id: '4625'\n    outcome: 'failure'\n  condition: selection",
        "mitre_tactics": ["TA0006"],
        "mitre_techniques": ["T1110"]
    },
    {
        "name": "Suspicious PowerShell Execution",
        "description": "Detects PowerShell execution with encoded commands or hidden windows.",
        "severity": "medium",
        "sigma_rule": "title: Suspicious PowerShell\ndetection:\n  selection:\n    event_id: '4688'\n    process_name: 'powershell.exe'\n    command_line: ['-enc', '-w hidden']\n  condition: selection",
        "mitre_tactics": ["TA0002"],
        "mitre_techniques": ["T1059"]
    },
    {
        "name": "LSASS Memory Dump",
        "description": "Detects attempts to access or dump LSASS memory for credentials.",
        "severity": "critical",
        "sigma_rule": "title: LSASS Dump\ndetection:\n  selection:\n    event_id: '10'\n    target_image: '*\\lsass.exe'\n  condition: selection",
        "mitre_tactics": ["TA0006"],
        "mitre_techniques": ["T1003"]
    },
    {
        "name": "User Account Created",
        "description": "Detects the creation of a new local or domain user account.",
        "severity": "medium",
        "sigma_rule": "title: User Created\ndetection:\n  selection:\n    event_id: '4720'\n  condition: selection",
        "mitre_tactics": ["TA0003"],
        "mitre_techniques": ["T1136"]
    }
]
