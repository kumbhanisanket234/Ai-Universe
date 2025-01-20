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
async def register_ai(register_ai : Annotated[registerai_form , Form(...)]  ):

    image_path = UPLOAD_DIR / register_ai.image.filename
    try:
        cur = conn.cursor()
        with open(image_path, "wb") as f:
            f.write(await register_ai.image.read())
        cur.execute(
            "INSERT INTO registerai (email , owner , modelName , modelType, modelVersion , modelHeight , modelWeight , manufactureName , feature , summary , image) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
            (
                register_ai.email, register_ai.owner, register_ai.modelName, register_ai.modelType, register_ai.modelVersion,
                register_ai.modelHeight,register_ai.modelWeight, register_ai.manufactureName, register_ai.feature,
                register_ai.summary, str(image_path)
            ))

        conn.commit()
        cur.close()
        return {"message": "AI registered successfully", "success": True}

    except Exception as e:
        return {"error": f"Failed to save image. Error: {str(e)}", "success": False}



@user.get("/register_ai" , tags=["Register AI"])
async def get_register_ai():
    cur = conn.cursor()
    cur.execute("SELECT * FROM registerai")
    register_ai = cur.fetchall()
    data = []
    val = []
    for i in cur.description:
        val.append(i[0])
    for row in register_ai:
        user_data = dict(zip(val, row))
        image_path = os.path.join(
            f"D:/hitesh/project/Ai-Universe/backend/app/{row[10]}"
        )
        # print(image_path)
        if os.path.exists(image_path):
            with open(image_path, "rb") as img_file:
                image = base64.b64encode(img_file.read()).decode("utf-8")
                user_data["image"] = image
        else:
            user_data["image"] = None
        data.append(user_data)
        cur.close()
    return { "data":data , "success": True}




@user.get("/register_ai" , tags=["Register AI"])
async def get_register_ai():
    cur = conn.cursor()
    cur.execute("SELECT * FROM registerai")
    register_ai = cur.fetchall()
    data = []
    val = []
    for i in cur.description:
        val.append(i[0])
    for row in register_ai:
        user_data = dict(zip(val, row))
        image_path = os.path.join(
            f"D:/hitesh/project/Ai-Universe/backend/app/{row[10]}"
        )
        # print(image_path)
        if os.path.exists(image_path):
            with open(image_path, "rb") as img_file:
                image = base64.b64encode(img_file.read()).decode("utf-8")
                user_data["image"] = image
        else:
            user_data["image"] = None
        data.append(user_data)
        cur.close()
    return { "data":data , "success": True}
