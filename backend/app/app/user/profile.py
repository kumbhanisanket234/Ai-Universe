from pathlib import Path
from fastapi import Depends
from .route import *
from .forms.register import *
from shared.db import conn
from fastapi import UploadFile , File , Form


UPLOAD_DIR = Path("profile_images")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

@user.patch("/profile_image" , tags=["Profile"])
async def profile(email : Annotated[str,Form()] , image : UploadFile = File(...)):

    image_path = UPLOAD_DIR / image.filename
    try :
        cur = conn.cursor()
        with open(image_path, "wb") as f:
            f.write(await image.read())
        cur.execute("UPDATE register SET image = %s WHERE email = %s", (str(image_path), email))
        conn.commit()
        cur.close()
        return {"message": "Profile image updated successfully" , "success" : True}

    except Exception as e:
        return {"error": f"Failed to save image. Error: {str(e)}" , "success" : False}