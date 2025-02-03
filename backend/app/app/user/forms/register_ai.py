from typing import Annotated
from fastapi import UploadFile , File , Form
from pydantic import BaseModel , EmailStr



class registerai_form(BaseModel):
    email : EmailStr
    owner : str
    modelName : str
    modelType : str
    modelVersion : str
    modelHeight : str
    modelWeight  : str
    manufactureName : str
    feature : str
    summary : str
    image : UploadFile = File(...)
    modelId : str


