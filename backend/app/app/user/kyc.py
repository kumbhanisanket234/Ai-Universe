from fastapi import Depends, Form
from shared.db import conn

from .forms.kyc import user_kyc_model
from .route import user
from .forms import kyc


@user.post("/kyc_owner", tags=["KYC"])
async def owner_kyc(user_kyc : user_kyc_model = Form()):
    cur = conn.cursor()

    cur.execute("insert into user_kyc(ownerName  , companyName  , businessType ,businessAddress ,panNumber ,aadharNumber ,isVerify ,panImage ,aadharImage ) values (%s,%s,%s,%s,%s,%s,%s,%s,%s)" , (
        user_kyc.ownerName , user_kyc.companyName , user_kyc.businessType , user_kyc.businessAddress , user_kyc.panNumber ,user_kyc.aadharNumber , user_kyc.isVerify , user_kyc.panImage , user_kyc.aadharImage
    ))
    conn.commit()
    cur.close()

    return {"kyc data success"}
