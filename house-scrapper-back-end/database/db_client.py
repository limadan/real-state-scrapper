import libsql
from dotenv import load_dotenv
import os

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