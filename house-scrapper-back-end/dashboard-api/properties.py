from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List
from auth import get_current_user
from database.real_state_property_queries import get_all_properties, get_favorite_properties, favorite_property, unfavorite_property
from typing import Optional

router = APIRouter()

class PropertyFavorite(BaseModel):
    favorite: bool

class Property(BaseModel):
    id: int
    source_id: str
    source_website: str
    price: int
    address: str
    number_of_rooms: int
    number_of_parking_spaces: Optional[int] = None
    photo_url: str
    access_link: str
    favorite: bool = False

@router.get("/properties", response_model=List[Property])
def get_properties(current_user: str = Depends(get_current_user)):
    """
    Get all properties.
    """
    properties = get_all_properties()
    return [
        {
            "id": row[0],
            "source_id": row[1],
            "source_website": row[2],
            "price": row[3],
            "address": row[4],
            "number_of_rooms": row[5],
            "number_of_parking_spaces": row[6],
            "photo_url": row[7],
            "access_link": row[8],
            "favorite": bool(row[9]) if len(row) > 9 else False
        }
        for row in properties
    ]

@router.get("/properties/favorites", response_model=List[Property])
def get_favorite_properties_endpoint(current_user: str = Depends(get_current_user)):
    """
    Get only favorite properties.
    """
    properties = get_favorite_properties()
    return [
        {
            "id": row[0],
            "source_id": row[1],
            "source_website": row[2],
            "price": row[3],
            "address": row[4],
            "number_of_rooms": row[5],
            "number_of_parking_spaces": row[6],
            "photo_url": row[7],
            "access_link": row[8],
            "favorite": bool(row[9]) if len(row) > 9 else True
        }
        for row in properties
    ]

@router.put("/properties/{property_id}/favorite")
def toggle_favorite(property_id: int, request: PropertyFavorite, current_user: str = Depends(get_current_user)):
    """
    Favorite or unfavorite a property.
    """
    if request.favorite:
        favorite_property(property_id)
    else:
        unfavorite_property(property_id)
    return {"message": "Property favorite status updated successfully"}
