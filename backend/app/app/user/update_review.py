import base64
from pathlib import Path
from typing import Annotated
from fastapi import Form, UploadFile, File, Depends
from pydantic import EmailStr
from shared.db import conn
import os
from .route import user
from .forms.update_review import *


@user.patch("/reviews_update" , tags=["Reviews"])
async def reviews(
    update_review : update_reviews_form = Depends()

):
    cur = conn.cursor()
    cur.execute("SELECT * FROM register WHERE email = %s", (update_review.email,))
    user = cur.fetchone()

    if user :

        if update_review.name is None:
            name = user[1]

        if update_review.description is None:
            description = user[2]

        if update_review.work is None:
            work = user[3]

        if update_review.location is None:
            location = user[6]

        if update_review.rating is None:
            rating = user[7]

        cur.execute("UPDATE reviews SET name = %s , description = %s , work = %s , location = %s , rating = %s ",
                        update_review.name, update_review.description, update_review.work, update_review.location, update_review.rating)
        return {"message" : "Review Update Successfully" , "success" : True}

    else:
        return {"error":"Review Not Found ","success" : False}


