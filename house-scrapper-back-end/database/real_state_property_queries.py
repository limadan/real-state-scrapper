from .db_client import get_db_connection

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

def get_all_properties():
    """
    Retrieves all properties from the database.
    """
    conn = get_db_connection()
    query = """
        SELECT id, source_id, source_website, price, address, number_of_rooms, number_of_parking_spaces, photo_url, access_link, favorite
        FROM real_state_property
        ORDER BY created_at DESC
    """
    cursor = conn.execute(query)
    results = cursor.fetchall()
    conn.close()
    return results

def get_favorite_properties():
    """
    Retrieves favorite properties from the database.
    """
    conn = get_db_connection()
    query = """
        SELECT id, source_id, source_website, price, address, number_of_rooms, number_of_parking_spaces, photo_url, access_link, favorite
        FROM real_state_property
        WHERE favorite = 1
        ORDER BY created_at DESC
    """
    cursor = conn.execute(query)
    results = cursor.fetchall()
    conn.close()
    return results

def favorite_property(property_id):
    """
    Marks a property as favorite.
    """
    conn = get_db_connection()
    query = "UPDATE real_state_property SET favorite = 1 WHERE id = ?"
    conn.execute(query, (property_id,))
    conn.commit()
    conn.close()

def unfavorite_property(property_id):
    """
    Unmarks a property as favorite.
    """
    conn = get_db_connection()
    query = "UPDATE real_state_property SET favorite = 0 WHERE id = ?"
    conn.execute(query, (property_id,))
    conn.commit()
    conn.close()
