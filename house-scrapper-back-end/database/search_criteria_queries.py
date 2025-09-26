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
        UPDATE search_criteria
        SET state = ?, city = ?, neighbourhoods = ?, min_price = ?, max_price = ?,
            min_number_of_rooms = ?, min_number_of_parking_spaces = ?
        WHERE id = 1  -- Assuming single criteria row
    """
    conn.execute(query, (state, city, neighbourhoods, min_price, max_price, min_number_of_rooms, min_number_of_parking_spaces))
    conn.commit()
    conn.close()
