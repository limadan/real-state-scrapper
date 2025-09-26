from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
from auth import get_current_user
from database.search_criteria_queries import get_search_criteria, update_search_criteria

router = APIRouter()

class SearchCriteria(BaseModel):
    state: Optional[str] = None
    city: Optional[str] = None
    neighbourhoods: Optional[str] = None
    min_price: Optional[int] = None
    max_price: Optional[int] = None
    min_number_of_rooms: Optional[int] = None
    min_number_of_parking_spaces: Optional[int] = None

class SearchCriteriaResponse(BaseModel):
    state: Optional[str]
    city: Optional[str]
    neighbourhoods: Optional[str]
    min_price: Optional[int]
    max_price: Optional[int]
    min_number_of_rooms: Optional[int]
    min_number_of_parking_spaces: Optional[int]

@router.get("/search-criteria", response_model=SearchCriteriaResponse)
def get_search_criteria_endpoint(current_user: str = Depends(get_current_user)):
    """
    Get search criteria.
    """
    criteria = get_search_criteria()

    row = criteria[0] if criteria else None
    return {
        "state": row[0] if row else None,
        "city": row[1] if row else None,
        "neighbourhoods": row[2] if row else None,
        "min_price": row[3] if row else None,
        "max_price": row[4] if row else None,
        "min_number_of_rooms": row[5] if row else None,
        "min_number_of_parking_spaces": row[6] if row else None,
    }

@router.put("/search-criteria")
def update_search_criteria_endpoint(request: SearchCriteria, current_user: str = Depends(get_current_user)):
    """
    Update search criteria.
    """
    # Fetch current to get defaults
    current = get_search_criteria()
    
    state = request.state or (current[0][0] if current else None)
    city = request.city or (current[0][1] if current else None)
    neighbourhoods = request.neighbourhoods or (current[0][2] if current else None)
    min_price = request.min_price or (current[0][3] if current else None)
    max_price = request.max_price or (current[0][4] if current else None)
    min_number_of_rooms = request.min_number_of_rooms or (current[0][5] if current else None)
    min_number_of_parking_spaces = request.min_number_of_parking_spaces or (current[0][6] if current else None)
    
    update_search_criteria(state, city, neighbourhoods, min_price, max_price, min_number_of_rooms, min_number_of_parking_spaces)
    return {"message": "Search criteria updated successfully"}
