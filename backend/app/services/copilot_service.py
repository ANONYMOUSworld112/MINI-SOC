from app.schemas.copilot import CopilotQuery, CopilotResponse

class CopilotService:
    @staticmethod
    def analyze_query(query: CopilotQuery) -> CopilotResponse:
        # Rule-based AI analysis without external API dependencies
        q = query.query.lower()
        context = query.context or {}
        
        summary = "Based on the provided telemetry, this appears to be suspicious activity."
        risk = "Medium"
        mitre = ["T1078 Valid Accounts"]
        actions = ["Review recent logins", "Check for impossible travel"]
        steps = ["1. Isolate endpoint", "2. Reset credentials", "3. Pull memory dump"]
        past = []

        if "brute force" in q or "4625" in q or "failed login" in q:
            summary = "Potential credential brute force attack detected targeting multiple accounts."
            risk = "High"
            mitre = ["T1110 Brute Force", "TA0006 Credential Access"]
            actions = ["Block source IP", "Enforce MFA", "Reset compromised passwords"]
            past = ["INC-2023-085 (Resolved)"]
            
        elif "ransomware" in q or "crypto" in q:
            summary = "High probability of ransomware activity indicating mass file modification."
            risk = "Critical"
            mitre = ["T1486 Data Encrypted for Impact"]
            actions = ["Isolate host IMMEDIATELY", "Disconnect from network shares", "Identify patient zero"]
            past = ["INC-2023-012 (Critical)"]
            
        elif "exfiltration" in q or "large transfer" in q:
            summary = "Data exfiltration over alternative protocol detected."
            risk = "High"
            mitre = ["T1048 Exfiltration Over Alternative Protocol"]
            actions = ["Block destination IP/Domain", "Identify user account", "Review transferred files"]
            
        return CopilotResponse(
            summary=summary,
            risk_assessment=risk,
            mitre_context=mitre,
            recommended_actions=actions,
            investigation_steps=steps,
            similar_past_incidents=past
        )
