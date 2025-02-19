import datetime
from datetime import timedelta
from shared.db import conn
from .route import user
from fastapi import Depends
from .. import oauth2_scheme, decode_token


@user.post("/premium_user" , tags=["premium_user"])
async def premium_user( days : int , token : str = Depends(oauth2_scheme)):
    payload = decode_token(token)
    email : str = payload["sub"]

    cur = conn.cursor()

    cur.execute("select * from register where  email = %s " , email)

    user = cur.fetchall()


    if user:
        buy_date = datetime.date.today()
        expired = buy_date + timedelta(days=days)

        cur.execute("insert into premium_user(email , expired , buy_date) values (%s , %s , %s)" ,( email , expired , buy_date ))
        conn.commit()
        cur.close()
        return {"message" : " premium user Success " , "success":True}
    else:
        cur.close()
        return {"error" : "Not success" , "success" : False}



@user.get("/premium_user" ,  tags=["premium_user"])
async def premium_user(token : str = Depends(oauth2_scheme)):
    payload = decode_token(token)
    email : str = payload["sub"]

    cur = conn.cursor()

    cur.execute("select * from premium_user where email = %s order by id desc " , email)
    user = cur.fetchone()

    if user:
        if user[2] == user[3] or user[2] < user[3]:
            cur.close()
            return {"error" : "You have not active any premium plan" , "success" : False }

        else:
            return {"success" : True , "expiryDate" : user[2] }

