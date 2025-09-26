from .db_client import get_db_connection

def get_search_criteria():
    """
    Retrieves search criteria from the database.
    """
    conn = get_db_connection()
    query = """
        SELECT
            state, city, neighbourhoods, min_price, max_price,
            min_number_of_rooms, min_number_of_parking_spaces
        FROM search_criteria
    """
    cursor = conn.execute(query)
    results = cursor.fetchall()
    conn.close()
    return results

def update_search_criteria(state, city, neighbourhoods, min_price, max_price, min_number_of_rooms, min_number_of_parking_spaces):
    """
    Updates the search criteria in the database.
    """
    conn = get_db_connection()
    query = """
        INSERT INTO search_criteria (id, state, city, neighbourhoods, min_price, max_price, min_number_of_rooms, min_number_of_parking_spaces)
        VALUES (1, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
            state = excluded.state,
            city = excluded.city,
            neighbourhoods = excluded.neighbourhoods,
            min_price = excluded.min_price,
            max_price = excluded.max_price,
            min_number_of_rooms = excluded.min_number_of_rooms,
            min_number_of_parking_spaces = excluded.min_number_of_parking_spaces;
    """
    conn.execute(query, (state, city, neighbourhoods, min_price, max_price, min_number_of_rooms, min_number_of_parking_spaces))
    conn.commit()
    conn.close()
