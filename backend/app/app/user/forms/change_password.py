from pydantic import BaseModel


class changepasswordmodel(BaseModel):
    email: str
    old_password: str
    new_password: str