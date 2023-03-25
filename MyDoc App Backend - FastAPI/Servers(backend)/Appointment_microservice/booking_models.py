from sqlalchemy import Column, String, Integer, ForeignKey
from booking_database import base


class appointment(base):
	__tablename__ = 'appointment'
	id = Column(Integer, primary_key = True, index = True )
	user_name = Column(String(50))
	doctor_name = Column(String(50))
	patient_name = Column(String(50))
	patient_gender = Column(String(50))
	patient_age = Column(String(50))
	symptoms = Column(String(300))
	date = Column(String(50))
	time = Column(String(50))



# class user_booking(base):
# 	__tablename__ = 'user_booking'
# 	id = Column(Integer, primary_key = True, index = True )
# 	user_name = Column(String(50))
# 	patient_name = Column(String(50))
# 	date = Column(String(50))
# 	time = Column(String(50))
    


# class doctor_booking(base):
# 	__tablename__ = 'doctor_booking'
# 	id = Column(Integer, primary_key = True, index = True )
# 	doctor_name = Column(String(50))
# 	patient_name = Column(String(50))
# 	date = Column(String(50))
# 	time = Column(String(50))


    
    