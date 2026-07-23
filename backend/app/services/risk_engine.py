class RiskEngine:
    @staticmethod
    def calculate_risk_score(
        severity: str,
        confidence: int,
        asset_criticality: int,
        has_threat_intel: bool,
        behavioral_score: float = 0.0
    ) -> float:
        # severity weights: critical=40, high=30, medium=20, low=10
        severity_weight = {
            "critical": 40,
            "high": 30,
            "medium": 20,
            "low": 10,
            "info": 0
        }.get(severity.lower(), 10)
        
        threat_intel_score = 20 if has_threat_intel else 0
        
        raw_score = (
            severity_weight +
            (confidence * 0.2) +
            (asset_criticality * 5) + 
            threat_intel_score +
            behavioral_score
        )
        
        return min(100.0, max(0.0, raw_score))
