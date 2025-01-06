from fastapi_mail import MessageSchema, FastMail

from .forms.contactus import contactusmodel
from .. import *
from shared.db import conn
from .route import  *
from .forms.contactus import *


@user.post("/contactus" , tags=["Contactus"])
async  def contactus(contactus : contactusmodel):
    cur = conn.cursor()
    cur.execute("insert into contactus (fullname , email , message) values (%s,%s,%s)" ,
                (contactus.fullname , contactus.email , contactus.message))

    message = MessageSchema(
        subject="Contact Us | AI - Universe",
        recipients=[contactus.email],
        # body = f'hello we receive your message \n we will contact you soon \n your name is {contactus.fullname}'
        template_body= {"name" : contactus.fullname}
        ,subtype="html"

    )
    fm = FastMail(conf)
    await fm.send_message(message , template_name="contactus.html")
    conn.commit()
    cur.close()
    return {"message": "Your message has been sent successfully" , "success" : True}


