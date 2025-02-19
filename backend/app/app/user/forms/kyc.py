from fastapi import File, UploadFile
from pydantic import BaseModel


class user_kyc_model(BaseModel):
    ownerName : str
    companyName : str
    businessType : str
    businessAddress : str
    panNumber : str
    aadharNumber : str
    isVerify : bool
    panImage : UploadFile
    aadharImage : UploadFile


class device_kyc_model(BaseModel):
    deviceName : str
    modelNumber : str
    manufacturer : str
    deviceImage : str
    ownership : str
    manufacturerCertificate : str
    isVerify : bool






