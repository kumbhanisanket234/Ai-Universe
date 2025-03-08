from pathlib import Path
from fastapi import Depends, Form
from shared.db import conn
from .forms.device_kyc import device_kyc_model
from .route import user
from .. import oauth2_scheme, decode_token

UPLOAD_DIR = Path("upload_kyc")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@user.post("/kyc_owner", tags=["KYC"])
async def owner_kyc(token:str = Depends(oauth2_scheme),user_kyc : device_kyc_model  = Form()):
    payload = decode_token(token)
    email: str = payload["sub"]

    cur = conn.cursor()
    cur.execute("select * from register where email = %s " , email)
    getuser = cur.fetchone()

    if getuser:

        cur.execute("select * from device_kyc where email = %s", email)
        user = cur.fetchone()

        if user:

            return {"error" : "your kyc is under process" , "success" : False}

        else:
            image_path = UPLOAD_DIR / user_kyc.deviceImage.filename
            with open(image_path, "wb") as f:
                f.write(await user_kyc.deviceImage.read())

            cur = conn.cursor()
            cur.execute("insert into user_kyc(email , deviceName  , modelNumber  , manufacturer ,deviceImage ,ownership ,manufacturerCertificate ,isVerify ) values (%s,%s,%s,%s,%s,%s,%s,%s)" ,
                        (user_kyc.deviceName , user_kyc.modelNumber , user_kyc.manufacturer , str(image_path) , user_kyc.ownership ,user_kyc.manufacturerCertificate , False ))
            conn.commit()
            cur.close()
            return {"success" : True ,  "message":"Your KYC is currently under process. We will review it shortly, and the status will be updated once the verification is complete"}


    else:
        return {"error" : "user doesn't exit" , "success" : False}
