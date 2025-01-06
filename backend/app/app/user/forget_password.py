import random

from fastapi import HTTPException, Body
from fastapi_mail import MessageSchema, FastMail
from starlette.responses import JSONResponse
from .route import user
from .. import conf, hash_password
from shared.db import conn

otp_storage = {} #temp store otp

@user.post("/forgotpassword" , tags=["Password"])
async def forgotpassword(email : str):
    cur = conn.cursor()
    cur.execute("SELECT * FROM register WHERE email = %s", (email,))
    user = cur.fetchone()
    if user:
        otp = random.randint(1000, 9999)
        otp_storage[email] = otp
        cur.close()
        message = MessageSchema(
            subject="Forgot Password Otp",
            recipients=[email],
            # body=f"your Otp is {otp}",
            template_body = {"otp": otp , "name" : user[4]},
            subtype="html"
        )
        fm = FastMail(conf)
        # print(otp_storage)

        try:
            await fm.send_message(message , template_name="forgotpassword.html")
            return JSONResponse(content={"message": f"Mail sent to {email}" , "success": True})
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    else:
        cur.close()
        return {"error": "Invalid email" , "success": False}



@user.post("/forgotpassword/resetpassword" , tags=["Password"])
async def reset_password(
        email: str = Body(...),
        new_password: str = Body(...),
        otp: int = Body(...)
):
    if email in otp_storage and otp_storage[email] == otp:
        cur = conn.cursor()
        cur.execute("SELECT * FROM register WHERE email = %s", (email,))
        user = cur.fetchone()
        if user:
            hashed_password = hash_password(new_password)
            cur.execute("UPDATE register SET password = %s WHERE email = %s", (hashed_password, email))
            conn.commit()
            cur.close()
            del otp_storage[email]
            return {"message": "Password updated successfully" , "success": True}
        else:
            cur.close()
            return {"error": "Invalid email"}
    else:
        return JSONResponse(status_code=400, content={"error": "Invalid OTP" , "success": False})

