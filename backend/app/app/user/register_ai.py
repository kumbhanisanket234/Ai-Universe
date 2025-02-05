import base64
import os
from fastapi import HTTPException
from pathlib import Path
from datetime import date
from fastapi.params import Depends
from shared.db import conn
from .forms.register_ai import *
from .route import *
from .. import oauth2_scheme, decode_token

UPLOAD_DIR = Path("upload_ai_images")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

@user.post("/register_ai" , tags=["Register AI"])
async def register_ai( 
    register_ai : registerai_form = Depends()
):
        image_path = UPLOAD_DIR / register_ai.image.filename


        image_path = UPLOAD_DIR / image.filename

        cur = conn.cursor()
        cur.execute("select * from register where email = %s " , register_ai.email )
        user = cur.fetchone()

        if user:
            if not register_ai.email.strip():
                cur.close()
                return {"error": "Email is required", "success": False}

                # validation for Owner
            if not register_ai.owner.strip() :
                cur.close()
                return {"error": "Owner is required", "success": False}
            elif register_ai.owner.strip():
                for i in register_ai.owner:
                    if not i.isalpha():
                        cur.close()
                        return {"error": "Enter valid Owner Name", "success": False}

                #validations For model Name
            if not register_ai.modelName.strip():
                cur.close()
                return {"error": "Model Name is required", "success": False}
            elif register_ai.modelName.strip():
                for i in register_ai.modelName:
                    if not i.isalpha():
                        cur.close()
                        return {"error": "Enter valid model name", "success": False}

                #validation For model Type
            if not register_ai.modelType.strip():
                cur.close()
                return {"error": "Model Type is required", "success": False}
            elif register_ai.modelType.strip():
                for i in register_ai.modelType:
                    if not i.isalpha():
                        cur.close()
                        return {"error": "Enter valid model Type", "success": False}

                #validation For Model Version
            if not register_ai.modelVersion.strip():
                cur.close()
                return {"error": "Model Version is required", "success": False}
            elif register_ai.modelVersion.strip():
                for i in register_ai.modelVersion:
                    if i == ".":
                        continue
                    if not i.isdigit():
                        cur.close()
                        return {"error": "Enter valid Model Version", "success": False}

                #validation For Model Height
            if not register_ai.modelHeight.strip():
                cur.close()
                return {"error": "Model Height is required", "success": False}
            elif register_ai.modelHeight.strip():
                for i in register_ai.modelHeight:
                    if not i.isdigit():
                        cur.close()
                        return {"error": "Enter valid Model Height", "success": False}

                #validation for model weight
            if not register_ai.modelWeight.strip():
                cur.close()
                return {"error": "Model Weight is required", "success": False}
            elif register_ai.modelWeight.strip():
                for i in register_ai.modelWeight:
                    if not i.isdigit():
                        cur.close()
                        return {"error": "Enter valid Model Weight", "success": False}

                # validation for manufacture name
            if not register_ai.manufactureName.strip():
                cur.close()
                return {"error": "Manufacture Name is required", "success": False}
            elif register_ai.manufactureName.strip():
                for i in register_ai.manufactureName:
                    if not i.isalpha():
                        cur.close()
                        return {"error": "Enter valid Manufacture Name", "success": False}

                # validation for feature
            if not register_ai.feature.strip():
                cur.close()
                return {"error": "Feature is required", "success": False}

                #  validation for summary
            if not register_ai.summary.strip():
                cur.close()
                return {"error": "Summary is required", "success": False}

                # validation for model id

            cur.execute("select * from registerai where modelId = %s " , register_ai.modelId)
            model = cur.fetchone()

            if model:
                cur.close()
                return {"error" : "This Model Id Already Exist "}

            else :
                if not register_ai.modelId.strip():
                    cur.close()
                    return {"error": "Model Id is required", "success": False}
                elif register_ai.modelId.strip():
                    for i in register_ai.modelId:
                        if not i.isdigit():
                            cur.close()
                            return {"error": "Enter valid Model Id", "success": False}

            registerDate = date.today()

            cur.execute(
                    "INSERT INTO registerai (email, owner, modelName, modelType, modelVersion, modelHeight, modelWeight, manufactureName, feature, summary, image, modelId , registerDate) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                    (
                        register_ai.email, register_ai.owner, register_ai.modelName, register_ai.modelType,
                        register_ai.modelVersion,
                        register_ai.modelHeight, register_ai.modelWeight, register_ai.manufactureName, register_ai.feature,
                        register_ai.summary, str(image_path), register_ai.modelId ,registerDate
                    )
                )
            conn.commit()
            cur.close()
            return {"message": "AI registered successfully", "success": True}

        else:
            return {"error" : "Email Not register " , "success" : False }

    

        else:
            return {"error" : "Email Not register " , "success" : False }

    

            # validation for Owner
        if not register_ai.owner.strip():
            cur.close()
            return {"error": "Owner is required", "success": False}
        elif register_ai.owner.strip():
            for i in register_ai.owner.replace(" " , ""):
                if not i.isalpha():
                    cur.close()
                    return {"error": "Enter valid Owner Name", "success": False}

            # validations For model Name
        if not register_ai.modelName.strip():
            cur.close()
            return {"error": "Model Name is required", "success": False}
        elif register_ai.modelName.strip():
            for i in register_ai.modelName:
                if not i.isalpha():
                    cur.close()
                    return {"error": "Enter valid model name", "success": False}

            # validation For model Type
        if not register_ai.modelType.strip():
            cur.close()
            return {"error": "Model Type is required", "success": False}
        elif register_ai.modelType.strip():
            for i in register_ai.modelType:
                if not i.isalpha():
                    cur.close()
                    return {"error": "Enter valid model Type", "success": False}

            # validation For Model Version
        if not register_ai.modelVersion.strip():
            cur.close()
            return {"error": "Model Version is required", "success": False}
        elif register_ai.modelVersion.strip():
            for i in register_ai.modelVersion:
                if i == ".":
                    continue
                if not i.isdigit():
                    cur.close()
                    return {"error": "Enter valid Model Version", "success": False}

            # validation For Model Height
        if not register_ai.modelHeight.strip():
            cur.close()
            return {"error": "Model Height is required", "success": False}
        elif register_ai.modelHeight.strip():
            for i in register_ai.modelHeight:
                if not i.isdigit():
                    cur.close()
                    return {"error": "Enter valid Model Height", "success": False}

            # validation for model weight
        if not register_ai.modelWeight.strip():
            cur.close()
            return {"error": "Model Weight is required", "success": False}
        elif register_ai.modelWeight.strip():
            for i in register_ai.modelWeight:
                if not i.isdigit():
                    cur.close()
                    return {"error": "Enter valid Model Weight", "success": False}

            # validation for manufacture name
        if not register_ai.manufactureName.strip():
            cur.close()
            return {"error": "Manufacture Name is required", "success": False}
        elif register_ai.manufactureName.strip():
            for i in register_ai.manufactureName.replace(" " , ""):
                if not i.isalpha():
                    cur.close()
                    return {"error": "Enter valid Manufacture Name", "success": False}

            # validation for feature
        if not register_ai.feature.strip():
            cur.close()
            return {"error": "Feature is required", "success": False}

            #  validation for summary
        if not register_ai.summary.strip():
            cur.close()
            return {"error": "Summary is required", "success": False}

        # validation for model id

        cur.execute("select * from registerai where modelId = %s ", register_ai.modelId)
        model = cur.fetchone()

        if model:
            cur.close()
            return {"error": "This Model Id Already Exist "}

        else:
            if not register_ai.modelId.strip():
                cur.close()
                return {"error": "Model Id is required", "success": False}
            elif register_ai.modelId.strip():
                for i in register_ai.modelId:
                    if not i.isdigit():
                        cur.close()
                        return {"error": "Enter valid Model Id", "success": False}

        registerDate = date.today()

        cur.execute(
                "INSERT INTO registerai (email, owner, modelName, modelType, modelVersion, modelHeight, modelWeight, manufactureName, feature, summary, image, modelId , registerDate) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                (
                    register_ai.email, register_ai.owner, register_ai.modelName, register_ai.modelType,
                    register_ai.modelVersion,
                    register_ai.modelHeight, register_ai.modelWeight, register_ai.manufactureName, register_ai.feature,
                    register_ai.summary, str(image_path), register_ai.modelId, registerDate
                )
            )
        conn.commit()
        cur.close()
        return {"message": "AI registered successfully", "success": True}

    else:
        return {"error": "Email Not register ", "success": False}

@user.get("/register_ai", tags=["Register AI"])
async def get_register_ai():
    cur = conn.cursor()
    cur.execute("SELECT * FROM registerai")
    cwd = os.getcwd()
    register_ai = cur.fetchall()
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

    return {"data":data , "success": True}

    
