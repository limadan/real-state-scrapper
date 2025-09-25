import logging
from .db_queries import get_unseen_properties, get_email_list, mark_properties_seen
from .email_service import send_notification_email

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def main():
    """
    Main function to run the email notification service.
    """
    try:
        properties = get_unseen_properties(10)
        if not properties:
            logger.info("No unseen properties found.")
            return

        emails = get_email_list()
        if not emails:
            logger.warning("No emails in the email list.")
            return

        send_notification_email(emails, properties)

        property_ids = [prop[0] for prop in properties]
        mark_properties_seen(property_ids)

        logger.info(f"Successfully sent notification for {len(properties)} properties to {len(emails)} email(s).")

    except Exception as e:
        logger.error(f"Error in notification service: {e}")
        raise

if __name__ == '__main__':
    main()
