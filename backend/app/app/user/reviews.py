from pathlib import Path
from typing import Annotated
from fastapi import Form, UploadFile, File
from shared.db import conn
from .route import user



UPLOAD_DIR = Path("uploaded_images")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)





@user.post("/reviews" , tags=["Reviews"])
async def reviews(
        name: Annotated[str, Form(...)],
        description: Annotated[str, Form(...)],
        work: Annotated[str, Form(...)],
        email: Annotated[str, Form(...)],
        location: Annotated[str, Form(...)],
        image: UploadFile = File(...)
):
    print(type(image))
    cur = conn.cursor()
    cur.execute("SELECT * FROM register WHERE email = %s", (email,))
    user = cur.fetchone()
    cur.close()
    if user:
        image_path = UPLOAD_DIR / image.filename
        try:
            with open(image_path, "wb") as f:
                f.write(await image.read())
            cur = conn.cursor()
            cur.execute(
                "INSERT INTO reviews (name, description, work, email, image, location) VALUES (%s, %s, %s, %s, %s, %s)",
                (name, description, work, email, str(image_path), location)
            )
            conn.commit()
            cur.close()
            return {"success": True, "message": "Review submitted successfully"}
        except Exception as e:
            return {"success": False, "error": f"Failed to save image. Error: {str(e)}"}
    else:
        return {"success": False, "error": "User not found"}



@user.get("/reviews" , tags=["Reviews"])
async def get_reviews():
    cur = conn.cursor()
    cur.execute("SELECT * FROM reviews")
    reviews = cur.fetchall()
    data = []
    val = []
    for i in cur.description:
        # print(i)
        val.append(i[0])
    for row in reviews:
        user_data = dict(zip(val, row))
        data.append(user_data)
    cur.close()
    return {"reviews": data}


