from typing import Annotated

from fastapi import Form, UploadFile
from pydantic import EmailStr, BaseModel


#
# class RegisterForm:
#     def __init__(self,
#                  email: EmailStr,
#                  password: str,
#                  phone: str,
#                  fullName : str,
#                  dob: str,
#                  country: str,
#                  gender: str,
#                  image: UploadFile = File(...) | None
#                  ):
# 
#         self.email = email
#         self.password = password
#         self.phone = phone
#         self.fullName = fullName
#         self.dob = dob
#         self.country = country
#         self.gender = gender
#         self.image = image


class RegisterForm(BaseModel):
    email: Annotated[EmailStr, Form(...)]
    password: Annotated[str, Form(...)]
    phone: Annotated[str, Form(...)]
    fullName: Annotated[str, Form(...)]
    dob: Annotated[str, Form(...)]
    country: Annotated[str, Form(...)]
    gender: Annotated[str, Form(...)]
    image: UploadFile | None = None
