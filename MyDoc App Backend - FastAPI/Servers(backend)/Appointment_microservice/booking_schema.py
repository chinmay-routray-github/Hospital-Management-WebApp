from pydantic import BaseModel
from typing import Union



class Appointment(BaseModel):
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

class TokenData(BaseModel):
    name: Union[str, None] = None

    

# class Doctor_booking(BaseModel):
# 	doctor_name : str
# 	patient_name : str
# 	date : str
# 	time : str

class Doctor(BaseModel):
    # id : int
    name : str
    email : str
    password : str
    phone : str
    specialization : str
    experience : int
    
