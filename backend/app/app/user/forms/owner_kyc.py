from fastapi import File, UploadFile
from pydantic import BaseModel


class user_kyc_model(BaseModel):
    ownerName : str
    companyName : str
    businessType : str
    businessAddress : str
    panNumber : str
    aadharNumber : str
    # isVerify : bool
    panImage : UploadFile
    aadharImage : UploadFile






