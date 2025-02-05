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

    if user:
        cur.execute("select * from user_password_history where email = %s" , change_password.email)
        last_pass_data = cur.fetchall()

        if last_pass_data:
            cur.execute("select * from user_password_history WHERE email = %s  ORDER BY created_at DESC LIMIT 3" , change_password.email)
            last_password = cur.fetchall()
            if last_password:
                for i in last_password:
                    print(i)
                    if verify_password(change_password.new_password , i[2]):
                        cur.close()
                        return {"error" : "your new password is not same last three password "}

        if change_password.new_password == change_password.old_password:
            cur.close()
            return {"error" : "New password cannot be same as old password" , "success" : False}

        if (not any(c.isupper() for c in change_password.new_password) or
                not any(c.islower() for c in change_password.new_password) or
                not any(c.isdigit() for c in change_password.new_password) or
                not any(c in "!@#$%^&*()_+-=[]{};':,.<>?/`~" for c in change_password.new_password)):
            cur.close()
            return {
                "error": "Enter a strong password",
                "success": False
            }
        if verify_password(change_password.old_password, user[2]):
            hashed_password = hash_password(change_password.new_password)
            cur = conn.cursor()

            cur.execute("UPDATE register SET password = %s WHERE email = %s", (hashed_password, change_password.email))
            cur.execute("insert into user_password_history (email , password_hash) values (%s , %s )" ,(change_password.email , hashed_password))

            conn.commit()
            cur.close()
            return {"message": "Password changed successfully" , "success" : True}
        else:
            return {"error": "Invalid old password" , "success" : False}
    else:
        return {"error": "Invalid email" , "success" : False}

