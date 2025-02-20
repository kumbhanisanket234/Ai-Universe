from pydantic import BaseModel
from fastapi import UploadFile

class device_kyc_model(BaseModel):
    deviceName : str
    modelNumber : str
    manufacturer : str
    deviceImage : UploadFile
    ownership : str
    manufacturerCertificate : str
    isVerify : bool

