import base64
from pathlib import Path
from typing import Annotated
from fastapi import Form, UploadFile, File, Depends
from pydantic import EmailStr
from shared.db import conn
import os
from .route import user
from .forms import reviews
import zlib
from fastapi import HTTPException
from .. import oauth2_scheme, decode_token

UPLOAD_DIR = Path("uploaded_images")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

@user.post("/reviews" , tags=["Reviews"])
async def reviews(
    name: Annotated[str, None,  Form()],
    description: Annotated[str, Form(...)],
    work: Annotated[str, Form(...)],
    email: Annotated[EmailStr, Form(...)],
    location: Annotated[str, Form(...)],
    rating: Annotated[int, Form(...)],
    image: UploadFile = File(...) ,
    token : str = Depends(oauth2_scheme)
    ):
    cur = conn.cursor()

    payload = decode_token(token)
    access_token = payload("sub")

    if not access_token:
        raise HTTPException(status_code=401 , detail=" Token Expired ")

    cur.execute("SELECT * FROM register WHERE email = %s", (email,))
    user = cur.fetchone()
    if user:
        image_path = UPLOAD_DIR / image.filename

        with open(image_path, "wb") as f:
            f.write(await image.read())
            cur = conn.cursor()

            if not name.strip():
                return {"success": False, "error": "Name is required"}
            elif not name.isalpha():
                return {"success": False, "error": "Enter valid name"}

            if not description.strip():
                return {"success": False, "error": "Description is required"}

            if not work.strip():
                return {"success": False, "error": "Work is required"}
            elif not work.isalpha():
                return {"success": False, "error": "Enter valid work"}

            if not location.strip():
                return {"success": False, "error": "Location is required"}
            elif not location.isalpha():
                return {"success": False, "error": "Enter valid location"}

            if rating == " " or None:
                return {"error" : "Rating is required" , "success" : False}
            elif rating < 1 or rating > 5:
                return {"error" : "Invalid rating" , "success" : False}

            cur.execute(
                    "INSERT INTO reviews (name, description, work, email, image, location , rating ) VALUES (%s, %s, %s, %s, %s, %s , %s)",
                    (name, description, work, email, str(image_path), location , rating)
            )
            conn.commit()
            cur.close()
            return {"success": True, "message": "Review submitted successfully"}
    else:
        return {"success": False, "error": "User not found"}

@user.get("/reviews", tags=["Reviews"])
async def get_reviews():
            cur = conn.cursor()
            cur.execute("SELECT * FROM reviews")
            reviews = cur.fetchall()
            data = []
            val = []
            cwd = os.getcwd()
            for i in cur.description:
                val.append(i[0])
            for row in reviews:
                user_data = dict(zip(val, row))
                # add your path
                image_path = os.path.join(
                    f"{cwd}/{row[5]}"
                )

                print(image_path)
                if os.path.exists(image_path):
                    with open(image_path, "rb") as img_file:
                        image = base64.b64encode(img_file.read()).decode("utf-8")
                        user_data["image"] = image
                else:
                    user_data["image"] = None

                data.append(user_data)
            cur.close()
            return {"reviews": data}