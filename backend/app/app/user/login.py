from fastapi import Depends, HTTPException
import requests
from fastapi import Request
# from google.auth.aio.transport.aiohttp import Request
from shared.db import conn
from .forms.login import LoginForm
from .route import user
from .. import verify_password, sign_token, oauth2_scheme, decode_token
import os
import base64
from user_agents import parse
import platform
import datetime


@user.post("/login", tags=["Login"])
async def login(request: Request, login_form: LoginForm = Depends() ) -> dict:
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

                user_agent_str = request.headers.get('user-agent', 'Unknown')
                user_agent = parse(user_agent_str)

                IP_add = requests.get(f"https://api64.ipify.org?format=json").json()["ip"]
                locations = requests.get(f"http://ip-api.com/json/{IP_add}").json()

                ip = request.client.host if request.client else "Unknown"
                os = platform.system()
                browser = user_agent.browser.family
                deviceType = "Mobile" if user_agent.is_mobile else "Tablet" if user_agent.is_tablet else "PC"
                loginDate = datetime.datetime.now().strftime("%Y-%m-%d")
                loginTime = datetime.datetime.now().strftime("%H:%M:%S")

                country = locations["country"]
                regionName = locations["regionName"]
                city = locations["city"]
                zipcode = locations["zip"]

                cur.execute(
                    "insert into recent_login (email , ip , os , browser , deviceType , loginDate , loginTime , country , regionName , city , zip ) values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
                    (login_form.email, ip, os, browser, deviceType, loginDate, loginTime, country, regionName, city , zipcode)
                )
                conn.commit()
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
            print(row)
            cwd = os.getcwd()
            if user_data["image"]:

                image_path = os.path.join(
                         f"{cwd}/{user_data[8]}"
                    )

                if os.path.exists(image_path):
                    with open(image_path, "rb") as img_file:
                            image = base64.b64encode(img_file.read()).decode("utf-8")
                            user_data[8] = image
                else:
                    user_data[8] = None
                cur.close()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return {"user": user_data, "success": True}
    finally:
        cur.close()
