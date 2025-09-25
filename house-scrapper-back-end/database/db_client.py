import libsql
from dotenv import load_dotenv
import os
from datetime import datetime, timezone

load_dotenv()

TURSO_DB_URL = os.getenv("TURSO_DB_URL")
TURSO_AUTH_TOKEN = os.getenv("TURSO_AUTH_TOKEN")

def get_db_connection():
    """
    Establishes and returns a connection to the Turso database.
    """
    db_folder = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(db_folder, "real_state.db")

    os.makedirs(db_folder, exist_ok=True)

    conn = libsql.connect(
        db_path,
        sync_url=TURSO_DB_URL,
        auth_token=TURSO_AUTH_TOKEN
    )
    conn.sync()
    return conn

def get_search_criteria():
    """
    Retrieves search criteria from the database.
    """
    conn = get_db_connection()
    query = """
        SELECT
            state, city, neighbourhoods, min_price, max_price,
            min_number_of_rooms,min_number_of_parking_spaces
        FROM search_criteria
    """
    cursor = conn.execute(query)
    results = cursor.fetchall()
    conn.close()
    return results

def insert_property(property_data):
    """
    Inserts a scraped property into the database.
    """
    conn = get_db_connection()
    query = """
        INSERT INTO real_state_property (
            source_id, source_website, price, address,
            number_of_rooms, number_of_parking_spaces, photo_url,
            access_link, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """
    conn.execute(query, (
        property_data.get('source_id'),
        property_data.get('source_website'),
        property_data.get('price'),
        property_data.get('address'),
        property_data.get('number_of_rooms'),
        property_data.get('number_of_parking_spaces'),
        property_data.get('photo_url'),
        property_data.get('access_link'),
        property_data.get('created_at')
    ))
    conn.commit()
    conn.close()

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
