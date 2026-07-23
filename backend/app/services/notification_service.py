import logging
from app.models.alert import Alert

logger = logging.getLogger(__name__)

class NotificationService:
    @staticmethod
    async def send_alert_notification(alert: Alert):
        # In a real system, send email, Slack, PagerDuty, etc.
        logger.info(f"NOTIFICATION: New alert {alert.severity.upper()} - {alert.title}")
