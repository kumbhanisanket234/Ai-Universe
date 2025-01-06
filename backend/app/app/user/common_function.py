from passlib.context import CryptContext
from pydantic import BaseModel
import jwt
from fastapi.security import OAuth2PasswordRequestForm , OAuth2PasswordBearer
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")




def hash_password(password: str):
    return context.hash(password)

def verify_password(password : str , hashed_password):
    return context.verify(password, hashed_password)

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"


class TokenData(BaseModel):
    email: str


def sign_token(email : str):
    token = jwt.encode({"sub": email}, SECRET_KEY, algorithm=ALGORITHM)
    return token


def decode_token(token : str):
    try :
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return decoded_token
    except:
        return {}

conf = ConnectionConfig(
    MAIL_USERNAME="hiteshladumor266@gmail.com",
    MAIL_PASSWORD="jscf nhva pdme lgcf",
    MAIL_FROM="hiteshladumor266@gmail.com",
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_FROM_NAME="AU Api",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    TEMPLATE_FOLDER='./templates/'
)
