import random
from datetime import datetime

from fastapi import Depends, Body
from fastapi_mail import MessageSchema, FastMail
from shared.db import conn
from pydantic import validator
from .forms.register import *
from .route import user
from .. import conf, hash_password

otp_storage = {}

@user.post("/register" , tags=["Register"])
async def register(register_form: RegisterForm = Depends()):
    cur = conn.cursor()

    cur.execute("SELECT * FROM register WHERE email = %s", (register_form.email,))
    if cur.fetchall():
        cur.close()
        return {"error": "Email already exists" , "success": False}
    cur.execute("SELECT * FROM register WHERE phone = %s", (register_form.phone,))

    if cur.fetchall():
        cur.close()
        return {"error": "Phone number already exists" , "success": False}

    if register_form.phone.isdigit():
        if len(register_form.phone) != 10:
            cur.close()
            return {"error" : "Phone number must be 10 digits" , "success" : False}
        else:
            pass
    else:
        cur.close()
        return {"error": "Phone number must contain only digits"
            , "success" : False }
    try:
        datetime.strptime(register_form.dob, "%Y-%m-%d")
    except ValueError:
        cur.close()
        return {"error": "Date of birth must be in the format YYYY-MM-DD", "success": False}


    if (not any(c.isupper() for c in register_form.password) or
            not any(c.islower() for c in register_form.password) or
            not any(c.isdigit() for c in register_form.password) or
            not any(c in "!@#$%^&*()_+-=[]{};':,.<>?/`~" for c in register_form.password)):
        cur.close()
        return {
            "error": "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character", "success" : False
             }

    for i in register_form.fullName.replace(" ", ""):
        if not i.isalpha():
            cur.close()
            return {"error": "Full Name must contain only letters", "success": False}

    if register_form.gender.lower() not in ["male", "female", "other"]:
        cur.close()
        return {"error": "Invalid gender", "success": False}
    else:
        pass

    try:
        send_otp = random.randint(1000, 9999)
        otp_storage[register_form.email] = {
            "otp": send_otp,
            "form_data": register_form
        }

        message = MessageSchema(
            subject="Register Otp",
            recipients=[register_form.email],
            # body=f"Welcome to AI - Universe.\n Your OTP is {send_otp}",
            template_body={"otp": send_otp , "name" : register_form.fullName},
            subtype="html",
        )

        # Send email
        fm = FastMail(conf)
        await fm.send_message(message , template_name="email.html")

        return {"message": "OTP sent to email. Please verify to complete registration." , "success": True}
    except Exception as e:
        return {"error": str(e)}

@user.post("/register/verify_otp" , tags=["Register"])
async def verify_user(email: Annotated[str, Body()], otp: Annotated[int, Body()]):
    cur = conn.cursor()
    print(otp_storage)
    try:
        if email not in otp_storage or otp_storage[email]["otp"] != otp:
            return {"error": "Invalid OTP or OTP expired" , "success": False}

        form_data = otp_storage[email]["form_data"]

        # Check if email already exists
        cur.execute("SELECT * FROM register WHERE email = %s", (form_data.email,))
        if cur.fetchall():
            del otp_storage[email]
            return {"error": "Email already exists" , "success": False}

        # Check if phone number already exists
        cur.execute("SELECT * FROM register WHERE phone = %s", (form_data.phone,))
        if cur.fetchall():
            del otp_storage[email]
            return {"error": "Phone number already exists" , "success": False}

        # Hash password and insert user data into the database
        
        
    
        hashed_password = hash_password(form_data.password)
    
        cur.execute(
            "INSERT INTO register (email, password, phone, fullName, dob, country, gender) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s)",
            (
                form_data.email, hashed_password, form_data.phone,
                form_data.fullName, form_data.dob, form_data.country,
                form_data.gender
            )
        )
        conn.commit()

        del otp_storage[email]

        return {"message": "Registered successfully" , "success": True}
    except Exception as e:
        conn.rollback()
        return {"error": str(e)}
    finally:
        cur.close()
