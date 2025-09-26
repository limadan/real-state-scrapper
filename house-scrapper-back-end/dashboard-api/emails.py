from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List
from auth import get_current_user
from database.email_queries import get_email_list, add_email, delete_email

router = APIRouter()

class Email(BaseModel):
    email: str

@router.get("/emails", response_model=List[Email])
def get_emails(current_user: str = Depends(get_current_user)):
    """
    Get email list.
    """
    emails = get_email_list()
    return [{"email": email} for email in emails]

@router.post("/emails", response_model=dict)
def create_email(request: Email, current_user: str = Depends(get_current_user)):
    """
    Add a new email.
    """
    add_email(request.email)
    return {"message": "Email added successfully"}


@router.delete("/emails/{email}")
def delete_email_endpoint(email: str, current_user: str = Depends(get_current_user)):
    """
    Delete an email.
    """
    delete_email(email)
    return {"message": "Email deleted successfully"}
