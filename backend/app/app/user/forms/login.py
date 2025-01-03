# login

from typing import Optional, Annotated
from fastapi import File, Depends
from pydantic import EmailStr


class LoginForm:
    def __init__(self,
                 email: EmailStr,
                 password: str):
        self.email = email
        self.password = password
