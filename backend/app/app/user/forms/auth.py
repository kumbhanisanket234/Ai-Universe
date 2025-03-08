from pydantic import BaseModel

class OTPVerification(BaseModel):
    # secret: str
    otp: str
    email : str


class enable_model:
    email : str