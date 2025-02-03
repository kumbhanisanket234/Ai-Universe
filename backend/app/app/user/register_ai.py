from pathlib import Path
import base64
import os
from fastapi import Depends
from shared.db import conn

from .forms.register_ai import *
from .route import *

UPLOAD_DIR = Path("upload_ai_images")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

@user.post("/register_ai" , tags=["Register AI"])
async def register_ai( 
    email : Annotated[str , Form()],
    owner : Annotated[str , Form()],
    modelName : Annotated[str , Form()],    
    modelType : Annotated[str , Form()],
    modelVersion : Annotated[str , Form()],
    modelHeight : Annotated[str , Form()],
    modelWeight  : Annotated[str , Form()],
    manufactureName : Annotated[str , Form()],
    feature : Annotated[str , Form()],
    summary : Annotated[str , Form()],
    image : UploadFile = File(...)
):

    image_path = UPLOAD_DIR / image.filename
    try:
        cur = conn.cursor()
        with open(image_path, "wb") as f:
            f.write(await image.read())
        cur.execute(
            "INSERT INTO registerai (email , owner , modelName , modelType, modelVersion , modelHeight , modelWeight , manufactureName , feature , summary , image) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
            (
                email, owner, modelName, modelType, modelVersion,
                modelHeight,modelWeight, manufactureName, feature,
                summary, str(image_path)
            ))

        conn.commit()
        cur.close()
        return {"message": "AI registered successfully", "success": True}

    except Exception as e:
        return {"error": f"Failed to save image. Error: {str(e)}", "success": False}



@user.get("/register_ai", tags=["Register AI"])
async def get_register_ai():
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM registerai")
            register_ai = cur.fetchall()
            data = []
            val = [i[0] for i in cur.description]
            for row in register_ai:
                user_data = dict(zip(val, row))
                image_path = os.path.join(
                    f"D:/Sem6/project/backend/app/{row[11]}"
                )
                if os.path.exists(image_path):
                    with open(image_path, "rb") as img_file:
                        image = base64.b64encode(img_file.read()).decode("utf-8")
                        user_data["image"] = image
                else:
                    user_data["image"] = None
                data.append(user_data)
        return {"data": data, "success": True}

    except Exception as e:
        return {"error": f"Failed to save image. Error: {str(e)}", "success": False}
