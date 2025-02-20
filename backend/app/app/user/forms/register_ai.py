from typing import Annotated
from fastapi import UploadFile , File , Form
from pydantic import BaseModel , EmailStr




class registerai_form(BaseModel):
    # email : Annotated[EmailStr , Form()]
    owner : Annotated[str , Form()]
    modelName : Annotated[str , Form()]
    modelType : Annotated[str ,Form()]
    modelVersion : Annotated[str , Form()]
    modelHeight : Annotated[str , Form()]
    modelWeight  : Annotated[str , Form()]
    manufactureName : Annotated[str , Form()]
    feature : Annotated[str , Form()]
    summary : Annotated[str , Form()]
    image : UploadFile = File(...) , Form()
    # modelId : Annotated[str , Form()]


