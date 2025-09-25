# Database module for the house-scrapper project
# This module provides database utilities and models for the application

from .db_client import get_db_connection, get_search_criteria, insert_property, insert_log

__all__ = ['get_db_connection', 'get_search_criteria', 'insert_property', 'insert_log']
