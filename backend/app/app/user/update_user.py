from fastapi import Depends, Body
from shared.db import conn
from .forms.update_user import  update_user_form

from .route import  *
from typing import Annotated

@user.patch("/update_user" , tags=["User"])
async def update_user_data(update_user : update_user_form = Depends()):
    cur = conn.cursor()
    cur.execute("SELECT * FROM register WHERE email = %s", (update_user.email,))
    user = cur.fetchone()
    if not user:
        return {"error": "User not found" , "success" : False}
    else:
        if update_user.fullName == None:
            update_user.fullName = user[4]
            # print(update_user.fullName)
        if update_user.dob == None:
            update_user.dob = user[5]

        if update_user.country == None:
            update_user.country = user[6]

        if update_user.gender == None:
            update_user.gender = user[7]

        cur.execute(
                    "UPDATE register SET fullName = %s, dob = %s , country = %s , gender = %s  WHERE email = %s",
                    (update_user.fullName, update_user.dob, update_user.country, update_user.gender ,update_user.email)
                )

        cur.close()
        conn.commit()
        return {"message": "User data updated successfully" , "success" : True}


