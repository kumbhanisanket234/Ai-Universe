from typing import Annotated

from fastapi import Body

from .forms.change_password import *
from .route import user
from shared.db import conn

from .. import verify_password, hash_password


@user.post("/changepassword" , tags=["Password"])
async def change_password(change_password : Annotated[changepasswordmodel , Body()]):
    cur = conn.cursor()
    cur.execute("SELECT * FROM register WHERE email = %s", (change_password.email,))
    user = cur.fetchone()
    cur.close()
    if user:
        if change_password.new_password == change_password.old_password:
            cur.close()
            return {"error" : "New password cannot be same as old password" , "success" : False}
        if verify_password(change_password.old_password, user[2]):
            hashed_password = hash_password(change_password.new_password)
            cur = conn.cursor()
            cur.execute("UPDATE register SET password = %s WHERE email = %s", (hashed_password, change_password.email))
            conn.commit()
            cur.close()
            return {"message": "Password changed successfully" , "success" : True}
        else:
            return {"error": "Invalid old password" , "success" : False}
    else:
        return {"error": "Invalid email" , "success" : False}

