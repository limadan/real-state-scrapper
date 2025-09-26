# Database module for the house-scrapper project
# This module provides database utilities and models for the application

from .db_client import get_db_connection
from .search_criteria_queries import get_search_criteria, update_search_criteria
from .real_state_property_queries import insert_property, get_unseen_properties, mark_properties_seen, get_all_properties, get_favorite_properties, favorite_property, unfavorite_property
from .email_queries import get_email_list, add_email, update_email, delete_email
from .log_queries import insert_log

__all__ = [
    'get_db_connection', 'insert_log',
    'get_search_criteria', 'update_search_criteria',
    'insert_property', 'get_unseen_properties', 'mark_properties_seen', 'get_all_properties', 'get_favorite_properties', 'favorite_property', 'unfavorite_property',
    'get_email_list', 'add_email', 'update_email', 'delete_email'
]
