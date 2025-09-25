from database.db_client import get_db_connection

def get_unseen_properties(limit=10):
    """
    Retrieves the most recent unseen properties from the database.
    """
    conn = get_db_connection()
    query = """
        SELECT id, source_id, source_website, price, address, number_of_rooms, number_of_parking_spaces, photo_url, access_link
        FROM real_state_property
        WHERE seen IS NULL
        ORDER BY created_at DESC
        LIMIT ?
    """
    cursor = conn.execute(query, (limit,))
    results = cursor.fetchall()
    conn.close()
    return results

def get_email_list():
    """
    Retrieves the list of email addresses from the database.
    """
    conn = get_db_connection()
    query = "SELECT email FROM email_list"
    cursor = conn.execute(query)
    results = [row[0] for row in cursor.fetchall()]
    conn.close()
    return results

def mark_properties_seen(property_ids):
    """
    Marks the specified properties as seen.
    """
    if not property_ids:
        return
    conn = get_db_connection()
    placeholders = ','.join('?' * len(property_ids))
    query = f"UPDATE real_state_property SET seen = 1 WHERE id IN ({placeholders})"
    conn.execute(query, property_ids)
    conn.commit()
    conn.close()
