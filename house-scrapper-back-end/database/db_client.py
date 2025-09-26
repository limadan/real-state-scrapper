import libsql
from dotenv import load_dotenv
import os
from datetime import datetime, timezone

load_dotenv()

if os.getenv("app") == "production":
    TURSO_DB_URL = os.getenv("TURSO_DB_URL")
    TURSO_AUTH_TOKEN = os.getenv("TURSO_AUTH_TOKEN")
    db_dir= "sqlite_files/prod"
else:
    TURSO_DB_URL = os.getenv("TURSO_HOMOLOG_DB_URL")
    TURSO_AUTH_TOKEN = os.getenv("TURSO_HOMOLOG_AUTH_TOKEN")
    db_dir= "sqlite_files/homolog"

def get_db_connection():
    """
    Establishes and returns a connection to the Turso database.
    """
    db_folder = os.path.dirname(os.path.abspath(__file__)) + f"/{db_dir}"
    db_path = os.path.join(db_folder, "real_state.db")

    os.makedirs(db_folder, exist_ok=True)

    conn = libsql.connect(
        db_path,
        sync_url=TURSO_DB_URL,
        auth_token=TURSO_AUTH_TOKEN
    )
    conn.sync()
    return conn

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
