"""
MITRE ATT&CK Framework Data
Complete set of tactics and key techniques for the SOC platform.
Uses 'id' as the key to match MitreTactic/MitreTechnique ORM models.
"""

TACTICS = [
    {"id": "TA0043", "name": "Reconnaissance", "description": "The adversary is trying to gather information they can use to plan future operations.", "url": "https://attack.mitre.org/tactics/TA0043/"},
    {"id": "TA0042", "name": "Resource Development", "description": "The adversary is trying to establish resources they can use to support operations.", "url": "https://attack.mitre.org/tactics/TA0042/"},
    {"id": "TA0001", "name": "Initial Access", "description": "The adversary is trying to get into your network.", "url": "https://attack.mitre.org/tactics/TA0001/"},
    {"id": "TA0002", "name": "Execution", "description": "The adversary is trying to run malicious code.", "url": "https://attack.mitre.org/tactics/TA0002/"},
    {"id": "TA0003", "name": "Persistence", "description": "The adversary is trying to maintain their foothold.", "url": "https://attack.mitre.org/tactics/TA0003/"},
    {"id": "TA0004", "name": "Privilege Escalation", "description": "The adversary is trying to gain higher-level permissions.", "url": "https://attack.mitre.org/tactics/TA0004/"},
    {"id": "TA0005", "name": "Defense Evasion", "description": "The adversary is trying to avoid being detected.", "url": "https://attack.mitre.org/tactics/TA0005/"},
    {"id": "TA0006", "name": "Credential Access", "description": "The adversary is trying to steal account names and passwords.", "url": "https://attack.mitre.org/tactics/TA0006/"},
    {"id": "TA0007", "name": "Discovery", "description": "The adversary is trying to figure out your environment.", "url": "https://attack.mitre.org/tactics/TA0007/"},
    {"id": "TA0008", "name": "Lateral Movement", "description": "The adversary is trying to move through your environment.", "url": "https://attack.mitre.org/tactics/TA0008/"},
    {"id": "TA0009", "name": "Collection", "description": "The adversary is trying to gather data of interest to their goal.", "url": "https://attack.mitre.org/tactics/TA0009/"},
    {"id": "TA0011", "name": "Command and Control", "description": "The adversary is trying to communicate with compromised systems to control them.", "url": "https://attack.mitre.org/tactics/TA0011/"},
    {"id": "TA0010", "name": "Exfiltration", "description": "The adversary is trying to steal data.", "url": "https://attack.mitre.org/tactics/TA0010/"},
    {"id": "TA0040", "name": "Impact", "description": "The adversary is trying to manipulate, interrupt, or destroy your systems and data.", "url": "https://attack.mitre.org/tactics/TA0040/"},
]

TECHNIQUES = [
    # Reconnaissance (TA0043)
    {"id": "T1595", "name": "Active Scanning", "tactic_id": "TA0043", "description": "Adversaries may execute active reconnaissance scans to gather information that can be used during targeting."},
    {"id": "T1592", "name": "Gather Victim Host Information", "tactic_id": "TA0043", "description": "Adversaries may gather information about the victim's hosts that can be used during targeting."},
    {"id": "T1589", "name": "Gather Victim Identity Information", "tactic_id": "TA0043", "description": "Adversaries may gather information about the victim's identity that can be used during targeting."},
    {"id": "T1590", "name": "Gather Victim Network Information", "tactic_id": "TA0043", "description": "Adversaries may gather information about the victim's networks that can be used during targeting."},

    # Resource Development (TA0042)
    {"id": "T1583", "name": "Acquire Infrastructure", "tactic_id": "TA0042", "description": "Adversaries may buy, lease, or rent infrastructure that can be used during targeting."},
    {"id": "T1587", "name": "Develop Capabilities", "tactic_id": "TA0042", "description": "Adversaries may build capabilities that can be used during targeting."},
    {"id": "T1585", "name": "Establish Accounts", "tactic_id": "TA0042", "description": "Adversaries may create and cultivate accounts with services that can be used during targeting."},

    # Initial Access (TA0001)
    {"id": "T1566", "name": "Phishing", "tactic_id": "TA0001", "description": "Adversaries may send phishing messages to gain access to victim systems."},
    {"id": "T1190", "name": "Exploit Public-Facing Application", "tactic_id": "TA0001", "description": "Adversaries may attempt to take advantage of a weakness in an Internet-facing computer."},
    {"id": "T1133", "name": "External Remote Services", "tactic_id": "TA0001", "description": "Adversaries may leverage external-facing remote services to initially access a network."},
    {"id": "T1078", "name": "Valid Accounts", "tactic_id": "TA0001", "description": "Adversaries may obtain and abuse credentials of existing accounts as a means of gaining Initial Access."},
    {"id": "T1189", "name": "Drive-by Compromise", "tactic_id": "TA0001", "description": "Adversaries may gain access to a system through a user visiting a website over the normal course of browsing."},
    {"id": "T1199", "name": "Trusted Relationship", "tactic_id": "TA0001", "description": "Adversaries may breach or leverage organizations who have access to intended victims."},

    # Execution (TA0002)
    {"id": "T1059", "name": "Command and Scripting Interpreter", "tactic_id": "TA0002", "description": "Adversaries may abuse command and script interpreters to execute commands, scripts, or binaries."},
    {"id": "T1059.001", "name": "PowerShell", "tactic_id": "TA0002", "description": "Adversaries may abuse PowerShell commands and scripts for execution."},
    {"id": "T1059.003", "name": "Windows Command Shell", "tactic_id": "TA0002", "description": "Adversaries may abuse the Windows command shell for execution."},
    {"id": "T1106", "name": "Native API", "tactic_id": "TA0002", "description": "Adversaries may interact with the native OS application programming interface to execute behaviors."},
    {"id": "T1053", "name": "Scheduled Task/Job", "tactic_id": "TA0002", "description": "Adversaries may abuse task scheduling functionality to facilitate initial or recurring execution."},
    {"id": "T1204", "name": "User Execution", "tactic_id": "TA0002", "description": "An adversary may rely upon specific actions by a user in order to gain execution."},
    {"id": "T1047", "name": "Windows Management Instrumentation", "tactic_id": "TA0002", "description": "Adversaries may abuse WMI to execute malicious commands and payloads."},

    # Persistence (TA0003)
    {"id": "T1547", "name": "Boot or Logon Autostart Execution", "tactic_id": "TA0003", "description": "Adversaries may configure system settings to automatically execute a program during system boot or logon."},
    {"id": "T1547.001", "name": "Registry Run Keys / Startup Folder", "tactic_id": "TA0003", "description": "Adversaries may achieve persistence by adding a program to a startup folder or referencing it with a Registry run key."},
    {"id": "T1543", "name": "Create or Modify System Process", "tactic_id": "TA0003", "description": "Adversaries may create or modify system-level processes to repeatedly execute malicious payloads."},
    {"id": "T1543.003", "name": "Windows Service", "tactic_id": "TA0003", "description": "Adversaries may create or modify Windows services to repeatedly execute malicious payloads as part of persistence."},
    {"id": "T1053.005", "name": "Scheduled Task", "tactic_id": "TA0003", "description": "Adversaries may abuse the Windows Task Scheduler to perform task scheduling for recurring execution."},
    {"id": "T1136", "name": "Create Account", "tactic_id": "TA0003", "description": "Adversaries may create an account to maintain access to victim systems."},
    {"id": "T1098", "name": "Account Manipulation", "tactic_id": "TA0003", "description": "Adversaries may manipulate accounts to maintain access to victim systems."},

    # Privilege Escalation (TA0004)
    {"id": "T1548", "name": "Abuse Elevation Control Mechanism", "tactic_id": "TA0004", "description": "Adversaries may circumvent mechanisms designed to control elevated privileges."},
    {"id": "T1548.002", "name": "Bypass User Account Control", "tactic_id": "TA0004", "description": "Adversaries may bypass UAC mechanisms to elevate process privileges on system."},
    {"id": "T1134", "name": "Access Token Manipulation", "tactic_id": "TA0004", "description": "Adversaries may modify access tokens to operate under a different user or system security context."},
    {"id": "T1068", "name": "Exploitation for Privilege Escalation", "tactic_id": "TA0004", "description": "Adversaries may exploit software vulnerabilities in an attempt to elevate privileges."},

    # Defense Evasion (TA0005)
    {"id": "T1070", "name": "Indicator Removal", "tactic_id": "TA0005", "description": "Adversaries may delete or modify artifacts generated within systems to remove evidence."},
    {"id": "T1070.001", "name": "Clear Windows Event Logs", "tactic_id": "TA0005", "description": "Adversaries may clear Windows Event Logs to hide the activity of an intrusion."},
    {"id": "T1036", "name": "Masquerading", "tactic_id": "TA0005", "description": "Adversaries may attempt to manipulate features of their artifacts to make them appear legitimate."},
    {"id": "T1027", "name": "Obfuscated Files or Information", "tactic_id": "TA0005", "description": "Adversaries may attempt to make an executable or file difficult to discover or analyze."},
    {"id": "T1562", "name": "Impair Defenses", "tactic_id": "TA0005", "description": "Adversaries may maliciously modify components of a victim environment to hinder or disable defensive mechanisms."},
    {"id": "T1218", "name": "System Binary Proxy Execution", "tactic_id": "TA0005", "description": "Adversaries may bypass process and/or signature-based defenses by proxying execution of malicious content."},

    # Credential Access (TA0006)
    {"id": "T1110", "name": "Brute Force", "tactic_id": "TA0006", "description": "Adversaries may use brute force techniques to gain access to accounts when passwords are unknown."},
    {"id": "T1110.001", "name": "Password Guessing", "tactic_id": "TA0006", "description": "Adversaries may guess passwords to attempt access to accounts."},
    {"id": "T1110.003", "name": "Password Spraying", "tactic_id": "TA0006", "description": "Adversaries may use a single or small list of commonly used passwords against many different accounts."},
    {"id": "T1003", "name": "OS Credential Dumping", "tactic_id": "TA0006", "description": "Adversaries may attempt to dump credentials to obtain account login and credential material."},
    {"id": "T1003.001", "name": "LSASS Memory", "tactic_id": "TA0006", "description": "Adversaries may attempt to access credential material stored in the process memory of the LSASS."},
    {"id": "T1555", "name": "Credentials from Password Stores", "tactic_id": "TA0006", "description": "Adversaries may search for common password storage locations to obtain user credentials."},
    {"id": "T1558", "name": "Steal or Forge Kerberos Tickets", "tactic_id": "TA0006", "description": "Adversaries may attempt to subvert Kerberos authentication by stealing or forging Kerberos tickets."},

    # Discovery (TA0007)
    {"id": "T1087", "name": "Account Discovery", "tactic_id": "TA0007", "description": "Adversaries may attempt to get a listing of accounts on a system or within an environment."},
    {"id": "T1046", "name": "Network Service Discovery", "tactic_id": "TA0007", "description": "Adversaries may attempt to get a listing of services running on remote hosts."},
    {"id": "T1135", "name": "Network Share Discovery", "tactic_id": "TA0007", "description": "Adversaries may look for folders and drives shared on remote systems."},
    {"id": "T1057", "name": "Process Discovery", "tactic_id": "TA0007", "description": "Adversaries may attempt to get information about running processes on a system."},
    {"id": "T1082", "name": "System Information Discovery", "tactic_id": "TA0007", "description": "An adversary may attempt to get detailed information about the operating system and hardware."},
    {"id": "T1016", "name": "System Network Configuration Discovery", "tactic_id": "TA0007", "description": "Adversaries may look for details about the network configuration and settings."},

    # Lateral Movement (TA0008)
    {"id": "T1021", "name": "Remote Services", "tactic_id": "TA0008", "description": "Adversaries may use Valid Accounts to log into a service designed to accept remote connections."},
    {"id": "T1021.001", "name": "Remote Desktop Protocol", "tactic_id": "TA0008", "description": "Adversaries may use Valid Accounts to log into a computer using the Remote Desktop Protocol (RDP)."},
    {"id": "T1021.002", "name": "SMB/Windows Admin Shares", "tactic_id": "TA0008", "description": "Adversaries may use Valid Accounts to interact with a remote network share using SMB."},
    {"id": "T1570", "name": "Lateral Tool Transfer", "tactic_id": "TA0008", "description": "Adversaries may transfer tools or other files between systems in a compromised environment."},

    # Collection (TA0009)
    {"id": "T1560", "name": "Archive Collected Data", "tactic_id": "TA0009", "description": "An adversary may compress and/or encrypt data that is collected prior to exfiltration."},
    {"id": "T1119", "name": "Automated Collection", "tactic_id": "TA0009", "description": "Once established within a system or network, an adversary may use automated techniques for collecting internal data."},
    {"id": "T1005", "name": "Data from Local System", "tactic_id": "TA0009", "description": "Adversaries may search local system sources to find files of interest."},
    {"id": "T1113", "name": "Screen Capture", "tactic_id": "TA0009", "description": "Adversaries may attempt to take screen captures of the desktop to gather information."},

    # Command and Control (TA0011)
    {"id": "T1071", "name": "Application Layer Protocol", "tactic_id": "TA0011", "description": "Adversaries may communicate using application layer protocols to avoid detection."},
    {"id": "T1071.001", "name": "Web Protocols", "tactic_id": "TA0011", "description": "Adversaries may communicate using application layer protocols associated with web traffic."},
    {"id": "T1071.004", "name": "DNS", "tactic_id": "TA0011", "description": "Adversaries may communicate using the Domain Name System (DNS) application layer protocol."},
    {"id": "T1105", "name": "Ingress Tool Transfer", "tactic_id": "TA0011", "description": "Adversaries may transfer tools or other files from an external system into a compromised environment."},
    {"id": "T1571", "name": "Non-Standard Port", "tactic_id": "TA0011", "description": "Adversaries may communicate using a protocol and port pairing that are typically not associated."},
    {"id": "T1572", "name": "Protocol Tunneling", "tactic_id": "TA0011", "description": "Adversaries may tunnel network communications to and from a victim system within a separate protocol."},
    {"id": "T1090", "name": "Proxy", "tactic_id": "TA0011", "description": "Adversaries may use a connection proxy to direct network traffic between systems."},

    # Exfiltration (TA0010)
    {"id": "T1041", "name": "Exfiltration Over C2 Channel", "tactic_id": "TA0010", "description": "Adversaries may steal data by exfiltrating it over an existing command and control channel."},
    {"id": "T1048", "name": "Exfiltration Over Alternative Protocol", "tactic_id": "TA0010", "description": "Adversaries may steal data by exfiltrating it over a different protocol than that of the existing C2 channel."},
    {"id": "T1567", "name": "Exfiltration Over Web Service", "tactic_id": "TA0010", "description": "Adversaries may use an existing, legitimate external Web service to exfiltrate data."},

    # Impact (TA0040)
    {"id": "T1486", "name": "Data Encrypted for Impact", "tactic_id": "TA0040", "description": "Adversaries may encrypt data on target systems to interrupt availability."},
    {"id": "T1485", "name": "Data Destruction", "tactic_id": "TA0040", "description": "Adversaries may destroy data and files on specific systems to interrupt availability."},
    {"id": "T1489", "name": "Service Stop", "tactic_id": "TA0040", "description": "Adversaries may stop or disable services on a system to render those services unavailable."},
    {"id": "T1490", "name": "Inhibit System Recovery", "tactic_id": "TA0040", "description": "Adversaries may delete or remove built-in operating system data designed to aid in recovery."},
    {"id": "T1499", "name": "Endpoint Denial of Service", "tactic_id": "TA0040", "description": "Adversaries may perform Endpoint Denial of Service (DoS) attacks to degrade availability of services."},
]
