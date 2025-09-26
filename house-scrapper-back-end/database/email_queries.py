from .db_client import get_db_connection

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

def add_email(email):
    """
    Adds an email to the list.
    """
    conn = get_db_connection()
    query = "INSERT INTO email_list (email) VALUES (?)"
    conn.execute(query, (email,))
    conn.commit()
    conn.close()

def update_email(email_id, new_email):
    """
    Updates an email in the list.
    """
    conn = get_db_connection()
    query = "UPDATE email_list SET email = ? WHERE email = ?"
    conn.execute(query, (new_email, email_id))
    conn.commit()
    conn.close()

def delete_email(email_id):
    """
    Deletes an email from the list.
    """
    conn = get_db_connection()
    query = "DELETE FROM email_list WHERE email = ?"
    conn.execute(query, (email_id,))
    conn.commit()
    conn.close()
