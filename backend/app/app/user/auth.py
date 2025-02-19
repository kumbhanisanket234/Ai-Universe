import pyotp
import qrcode
from fastapi import  HTTPException
from fastapi.params import Depends
from shared.db import conn
from .forms.auth import *
from .route import user
import base64

import pyotp
from fastapi import FastAPI
import pymysql



@user.post("/enable_2FA", tags=["2FA"])
async def enable_2FA(email: str):
    cur = conn.cursor()
    cur.callproc("enable_2fa", (email,))
    result = cur.fetchone()

    if result and result[0] == "user_exists":
        secret = pyotp.random_base32()
        otp_uri = pyotp.totp.TOTP(secret).provisioning_uri(name=email, issuer_name="AI Universe")

        cur.execute("SELECT * FROM auth WHERE email = %s", (email,))
        auth = cur.fetchone()

        if auth:
            cur.close()
            return {"error": "2FA already active", "success": False}

        cur.execute("INSERT INTO temp_auth (email, secret) VALUES (%s, %s)", (email, secret))
        conn.commit()
        cur.close()

        return {"otp_uri": otp_uri, "success": True, "secret": secret}

    elif result and result[0] == "already_active":
        cur.close()
        return {"error": "2FA already active", "success": False}

    else:
        cur.close()
        return {"success": False, "error": "User not found"}

@user.post("/verify_2fa/" , tags=["2FA"])
async def verify_otp(data: OTPVerification):

    cur = conn.cursor()
    cur.execute("select * from temp_auth where email = %s order by id desc limit 1" , data.email)
    user = cur.fetchone()

    if user:
        secret = user[2]
        totp = pyotp.TOTP(user[2])
        print(totp)
        if totp.verify(data.otp):

            cur.execute("update register set is_2fa = True where email = %s", data.email)
            cur.execute("insert into auth(email , secret) values (%s , %s)", (data.email, secret))
            conn.commit()
            cur.close()

            return {"message": "2FA verification successful" , "success" : True}
        else:
            raise HTTPException(status_code=400, detail="Invalid OTP")

    else:
        cur.close()
        return {"error" : "2fa not found" , "success" : False}


@user.post("/disable_2fa" , tags=["2FA"])
async def disable(disables : OTPVerification = Depends()):
    cur = conn.cursor()

    cur.execute("select * from auth where email = %s",disables.email)
    data = cur.fetchone()

    if data:
        totp = pyotp.TOTP(data[2])

        if totp.verify(disables.otp):
            cur.execute("delete from auth where email = %s" , disables.email)
            cur.execute("update register set is_2fa = False where email = %s" , disables.email)
            conn.commit()
            return {"message" : "2FA disable successfully " , "success":True}

        else:
            cur.close()
            return {"error":"Invalid Otp" , "success":False}

    else:
        cur.close()
        return {"error":"first enable 2FA " , "success" : False}

