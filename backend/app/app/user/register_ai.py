from pathlib import Path

from fastapi import Depends
from shared.db import conn

from .forms.register_ai import *
from .route import *

UPLOAD_DIR = Path("upload_ai_images")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@user.post("/register_ai" , tags=["Register AI"])
async def register_ai(register_ai : register_ai_form = Depends()):

    image_path = UPLOAD_DIR / register_ai.device_image.filename
    try:
        cur = conn.cursor()
        with open(image_path, "wb") as f:
            f.write(await register_ai.device_image.read())
        cur.execute(
            "INSERT INTO registerai (name , email , owner , description , model_type , model_name , model_version , model_size , manufacturer , ai_feature , kyc , device_image ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
            (
                register_ai.name, register_ai.email, register_ai.owner, register_ai.description, register_ai.model_type,
                register_ai.model_name, register_ai.model_version, register_ai.model_size, register_ai.manufacturer,
                register_ai.ai_feature, register_ai.kyc, str(image_path)
            ))
        conn.commit()
        cur.close()
        return {"message": "AI registered successfully", "success": True}

    except Exception as e:
        return {"error": f"Failed to save image. Error: {str(e)}", "success": False}



