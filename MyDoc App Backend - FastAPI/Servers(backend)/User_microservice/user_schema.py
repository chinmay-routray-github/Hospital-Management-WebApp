from pydantic import BaseModel
from typing import Union


class User(BaseModel):
    # id : int
    name : str
    email : str
    password : str
    phone : str
    question : str
    answer : str

class user_short(BaseModel):
    name : str
    email : str
    class Config:
        orm_mode = True


class user_login(BaseModel):
    username : str
    password : str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    name: Union[str, None] = None


class Booking(BaseModel):
	user_name : str
	doctor_name : str
	patient_name : str
	patient_gender : str
	patient_age : str
	symptoms : str
	date : str
	time : str


# class User_booking(BaseModel):
# 	user_name : str
# 	patient_name : str
# 	date : str
# 	time : str

    

# class Doctor_booking(BaseModel):
# 	doctor_name : str
# 	patient_name : str
# 	date : str
# 	time : str