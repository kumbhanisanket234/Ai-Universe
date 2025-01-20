from typing import Annotated
from pydantic import validator
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

    # @validator("phone")
    # def validate_phone(phone : str):
    #     if len(phone) != 10:
    #         raise ValueError("Phone number must be 10 digits long")
    #     if not phone[1:].isdigit():
    #         raise ValueError("Phone number must only contain digits")
    #     if phone[1:].startswith("0"):
    #         raise ValueError("Phone number must not start with 0")
    #     return phone


# @validator("password")
# def validate_password(password: str):
#     if len(password) < 8:
#         raise ValueError("Password must be at least 8 characters long")
#
#
#     return password
