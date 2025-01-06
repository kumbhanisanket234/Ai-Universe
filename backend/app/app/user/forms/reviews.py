from fastapi import Form, UploadFile, File
from pydantic import BaseModel, EmailStr
from typing_extensions import Annotated


class ReviewForm(BaseModel):
    name: Annotated[str, Form(...)]
    description: Annotated[str, Form(...)]
    work: Annotated[str, Form(...)]
    email: Annotated[EmailStr, Form(...)]
    location: Annotated[str, Form(...)]
    image: UploadFile = File(...)
