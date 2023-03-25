from pydantic import BaseModel
from typing import Union


class Doctor(BaseModel):
    # id : int
    name : str
    email : str
    password : str
    phone : str
    specialization : str
    experience : int


class doc_short(BaseModel):
    name : str
    email : str
    specialization : str
    experience : int
    class Config:
        orm_mode = True

class doc_login(BaseModel):
    username : str
    password : str

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    name: Union[str, None] = None

	
    
    
    
    