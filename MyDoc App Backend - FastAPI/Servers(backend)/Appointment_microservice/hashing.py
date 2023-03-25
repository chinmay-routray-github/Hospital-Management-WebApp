from passlib.context import CryptContext

pwd_cxt = CryptContext(schemes = ["bcrypt"], deprecated = "auto")

class Hash():
    def bcrypt(Password : str):
        return pwd_cxt.hash(Password)