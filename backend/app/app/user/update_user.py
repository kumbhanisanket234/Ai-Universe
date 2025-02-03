from datetime import datetime

from fastapi import Depends , HTTPException
from shared.db import conn
from .forms.update_user import  update_user_form

from .route import  *
from .. import oauth2_scheme, decode_token


@user.patch("/update_user" , tags=["User"])
async def update_user_data(update_user : update_user_form = Depends() , token : str = Depends(oauth2_scheme)):

    payload = decode_token(token)
    access_token = payload("sub")

    if not access_token:
        raise HTTPException(status_code=401 , detail=" Token Expired ")
    cur = conn.cursor()
    cur.execute("SELECT * FROM register WHERE email = %s", (update_user.email,))
    user = cur.fetchone()
    if not user:
        return {"error": "User not found" , "success" : False}
    else:
        if update_user.fullName is None :
            update_user.fullName = user[4]
            # print(update_user.fullName)
        if update_user.dob is None:
            update_user.dob = user[5]

        if update_user.country is None:
            update_user.country = user[6]

        if update_user.gender is None:
            update_user.gender = user[7]

        for i in update_user.fullName.replace(" ", ""):
            if not i.strip():
                cur.close()
                return {"error": "Fullname Not Send blank ", "success": False}
            elif i.strip():
                for j in i:
                    if not j.isalpha():
                        cur.close()
                        return {"error": "Enter valid  Name", "success": False}
        try:
            datetime.strptime(update_user.dob, "%Y-%m-%d")
        except ValueError:
            cur.close()
            return {"error": "Date of birth must be in the format YYYY-MM-DD", "success": False}

        for i in update_user.country.replace(" ", ""):
            if not i.strip():
                cur.close()
                return {"error": "country Not Send blank ", "success": False}
            elif i.strip():
                for j in i:
                    if not j.isalpha():
                        cur.close()
                        return {"error": "Enter valid country Name", "success": False}

        if not update_user.gender.strip():
            cur.close()
            return {"error" : "Enter gender not send blank " , "success" : False}
        elif update_user.gender.strip():
            for i in update_user.gender:
                if not i.isalpha():
                    cur.close()
                    return {"error":"Enter valid gender" , "success" : False}

        if update_user.gender.lower() not in ["male", "female", "other"]:
            cur.close()
            return {"error": "Invalid gender", "success": False}
        cur.execute(
                    "UPDATE register SET fullName = %s, dob = %s , country = %s , gender = %s  WHERE email = %s",
                    (update_user.fullName, update_user.dob, update_user.country, update_user.gender ,update_user.email)
                )

        cur.close()
        conn.commit()
        return {"message": "User data updated successfully" , "success" : True}


