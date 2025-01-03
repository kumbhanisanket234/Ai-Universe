from fastapi import Depends, HTTPException
from shared.db import conn
from .forms.login import LoginForm
from .route import user
from .. import verify_password, sign_token, oauth2_scheme, decode_token


@user.post("/login", tags=["Login"])
async def login(login_form: LoginForm = Depends()) -> dict:
    cur = conn.cursor()
    try:
        cur.execute("SELECT * FROM register WHERE email = %s", (login_form.email,))
        user = cur.fetchone()
        if user:
            val = []
            for i in cur.description:
                val.append(i[0])
            user_data = dict(zip(val, user))
            if verify_password(login_form.password, user_data["password"]):
                token = sign_token(user_data["email"])
                return {"token": token, "success": True, "message": "Login successful"}
            else:
                return {"success": False, "error": "Invalid email or password"}
        else:
            return {"success": False, "error": "Invalid email or password"}
    finally:
        cur.close()


@user.get("/login/getuser" , tags=["Login"])
async def get_user(token: str = Depends(oauth2_scheme)):
    payload = decode_token(token)
    email: str = payload.get("sub")
    if not email:
        raise HTTPException(status_code=401, detail="Invalid token")

    cur = conn.cursor()
    try:
        cur.execute("SELECT * FROM register WHERE email = %s", (email,))
        user = cur.fetchone()
        val = []
        for i in cur.description:
            val.append(i[0])

        for row in user:
            user_data = dict(zip(val, user))

        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return {"user": user_data, "success": True}
    finally:
        cur.close()