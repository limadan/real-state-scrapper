from .db_client import get_db_connection
from datetime import datetime, timezone

def insert_log(level, message, service):
    """
    Inserts a log entry into the database.
    """
    conn = get_db_connection()
    timestamp = datetime.now(timezone.utc).isoformat()
    query = "INSERT INTO logs (timestamp, level, message, service) VALUES (?, ?, ?, ?)"
    conn.execute(query, (timestamp, level, message, service))
    conn.commit()
    conn.close()
