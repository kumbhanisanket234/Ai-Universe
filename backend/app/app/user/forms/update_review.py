from pydantic import BaseModel
from fastapi import  Form

class update_reviews_form (BaseModel):
    name : str | None = None
    description: str | None = None
    work: str | None = None
    email: str | None = None
    location: str | None = None
    rating: str | None = None