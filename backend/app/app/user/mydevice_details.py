import base64
import os
import datetime
from fastapi.params import Depends
from markdown_it.rules_inline import image

from .forms.update_device import *
from shared.db import conn
from .route import user
from .. import register


@user.post("/mydevices" , tags=["Register AI"])
async def mydevices_detils(email : str):
    cur = conn.cursor()
    cur.execute("Select * from register where email = %s" , email)
    user = cur.fetchone()

    if user:
        cur.execute("select * from registerai where email = %s" , email)
        register_ai = cur.fetchall()
        cwd = os.getcwd()
        data = []
        val = []
        for i in cur.description:
            val.append(i[0])
        for row in register_ai:
            user_data = dict(zip(val, row))
            image_path = os.path.join(
                f"{cwd}/{row[10]}"
            )
            # print(image_path)
            if os.path.exists(image_path):
                with open(image_path, "rb") as img_file:
                    image = base64.b64encode(img_file.read()).decode("utf-8")
                    user_data["image"] = image
            else:
                user_data["image"] = None
            data.append(user_data)
            cur.close()
        return {"data": data, "success": True}
    else:
        return {"error" : "User Not Found" , "success" : False}


@user.patch("/update_mydevice" ,tags=["Register AI"])
async def update_mydevice(update_device : update_device_model = Depends()):
    cur = conn.cursor()
    cur.execute("select * from registerai where modelId = %s",update_device.modelId)
    device = cur.fetchone()


    if device:

        email = device[1]
        registerDate = device[14]
        image = device[10]


        if update_device.owner is None or not update_device.owner.isalpha():
            update_device.owner = device[2]

        if update_device.modelName is None or not update_device.modelName.isalpha():
            update_device.modelName = device[3]

        if update_device.modelVersion is None or not update_device.modelVersion == "":
            update_device.modelVersion = device[4]

        if update_device.modelHeight is None or not update_device.modelHeight.isnumeric():
            update_device.modelHeight = device[5]

        if update_device.manufactureName is None or not update_device.manufactureName.isalpha():
            update_device.manufactureName = device[6]

        if update_device.modelType is None or not update_device.modelType.isalpha():
            update_device.modelType = device[7]

        if update_device.feature is None or not update_device.feature.isalpha():
            update_device.feature = device[8]

        if update_device.summary is None or update_device.summary == " ":
            update_device.summary = device[9]

        if update_device.modelWeight is None or not update_device.modelWeight.isnumeric():
            update_device.modelWeight = device[11]

        lastupdate = datetime.date.today()

        cur.execute("update registerai SET email = %s , registerDate = %s, owner = %s , image = %s , modelType = %s , modelName = %s , modelVersion = %s , modelHeight = %s , modelWeight = %s , manufactureName = %s, feature = %s , lastupdate = %s , summary = %s   Where modelId = %s " ,
                    (email , registerDate , update_device.owner ,  image ,  update_device.modelType , update_device.modelName , update_device.modelVersion , update_device.modelHeight , update_device.modelWeight , update_device.manufactureName , update_device.feature , lastupdate , update_device.summary ,  update_device.modelId ))
        conn.commit()
        return {"message" : "Device Details Update successfully " , "success" : True}
    else:
        conn.close()
        return {"error" : "Device Not Found " , "success" : False}

