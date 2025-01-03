from pydantic import BaseModel, EmailStr


class contactusmodel(BaseModel):
    fullname: str
    email: EmailStr
    # subject: str
    message: str