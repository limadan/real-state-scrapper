import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import logging
from database.log_queries import insert_log
from database.real_state_property_queries import get_unseen_properties, mark_properties_seen
from database.email_queries import get_email_list

from email_service import send_notification_email

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def main():
    """
    Main function to run the email notification service.
    """
    try:
        properties = get_unseen_properties(10)
        if not properties:
            message = "No unseen properties found."
            logger.info(message)
            insert_log('INFO', message, 'notifier')
            return

        emails = get_email_list()
        if not emails:
            message = "No emails in the email list."
            logger.warning(message)
            insert_log('WARNING', message, 'notifier')
            return

        send_notification_email(emails, properties)

        property_ids = [prop[0] for prop in properties]
        mark_properties_seen(property_ids)

        message = f"Successfully sent notification for {len(properties)} properties to {len(emails)} email(s)."
        logger.info(message)
        insert_log('INFO', message, 'notifier')

    except Exception as e:
        message = f"Error in notification service: {e}"
        logger.error(message)
        insert_log('ERROR', message, 'notifier')
        raise

if __name__ == '__main__':
    main()
