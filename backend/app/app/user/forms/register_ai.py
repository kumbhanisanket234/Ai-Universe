from typing import Annotated
from fastapi import UploadFile , File , Form
from pydantic import BaseModel



class register_ai_form(BaseModel):
    name:  Annotated[str, Form(...)]
    email: Annotated[str, Form(...)]
    owner: Annotated[str, Form(...)]
    description: Annotated[str, Form(...)]
    model_type: Annotated[str, Form(...)]
    model_name: Annotated[str, Form(...)]
    model_version: Annotated[str, Form(...)]
    model_size: Annotated[str, Form(...)]
    manufacturer : Annotated[str, Form(...)]
    ai_feature: Annotated[str, Form(...)]
    kyc: Annotated[str, Form(...)] = "Pending"
    device_image: UploadFile = File(...)


