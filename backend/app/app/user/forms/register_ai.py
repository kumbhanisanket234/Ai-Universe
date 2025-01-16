from typing import Annotated
from fastapi import UploadFile , File , Form
from pydantic import BaseModel



class registerai_form(BaseModel):
    email : str
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

