from pydantic import BaseModel, EmailStr


class update_user_form(BaseModel):
    email: EmailStr
    fullName: str | None = None
    dob : str | None = None
    country : str | None = None
    gender : str | None = None






