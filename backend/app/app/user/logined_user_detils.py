from fastapi.params import Depends
from shared.db import conn
from .route import user
from .. import oauth2_scheme, decode_token


@user.get("/recent_login" ,  tags=["recent_login"])
async def recent_login(token : str = Depends(oauth2_scheme)):
    cur = conn.cursor()
    payload = decode_token(token)
    email : str = payload["sub"]

    cur.execute("select * from recent_login where email = %s ORDER BY id DESC  LIMIT 3" , email)
    user = cur.fetchall()

    if user:
        data = []
        val = []
        for i in cur.description:
            val.append(i[0])
        for row in user:
            user_data = dict(zip(val, row))

            data.append(user_data)

        return {"data" : data , "success" : True}
    else:
        conn.close()
        return {"error" : "user not found " , "success" : False}


