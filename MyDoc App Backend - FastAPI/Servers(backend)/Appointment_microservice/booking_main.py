from fastapi import FastAPI, Depends, status, HTTPException, Response
from typing import Union, List
from pydantic import BaseModel
import booking_models
from booking_database import engine, base, sessionlocal
import uvicorn
from hashing import Hash
from sqlalchemy.orm import Session
import booking_schema
from fastapi.middleware.cors import CORSMiddleware
from datetime import date
from oauth2 import get_current_doctor


booking_models.base.metadata.create_all(engine)
today = str(date.today())



app = FastAPI()

def get_db():
	db = sessionlocal()
	try:
		yield db
	finally:
		db.close()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/user/appointment/add", status_code = status.HTTP_201_CREATED, tags = ['Appointment'])
async def create_appointment(request : booking_schema.Appointment, db: Session = Depends(get_db)):
	response = booking_models.appointment(user_name = request.user_name, doctor_name = request.doctor_name, patient_name = request.patient_name,
			 patient_gender = request.patient_gender, patient_age = request.patient_age, 
			 symptoms = request.symptoms, date = request.date, time = request.time)
	checker = db.query(booking_models.appointment).filter(booking_models.appointment.doctor_name == request.doctor_name,  
		 booking_models.appointment.time == request.time, booking_models.appointment.date == request.date).all()
	if(checker == []):
		db.add(response)
		db.commit()
		db.refresh(response)
		return response
	# raise HTTPException(detail = f"Requested slot not available",
	# 		 status_code = status.HTTP_406_NOT_ACCEPTABLE)
	return None


@app.get("/user/appointment/{name}", status_code = status.HTTP_200_OK, tags = ['Appointment'])
async def user_appointments( name:str, db : Session = Depends(get_db)):
	response = db.query(booking_models.appointment).filter(booking_models.appointment.user_name == name,
				booking_models.appointment.date >= today).all()
	if response == []:
		return [{ "date" : None}]
	return response


@app.get("/doctor/appointment/{name}", status_code = status.HTTP_200_OK, tags = ['Appointment'])
async def doctor_appointments(name : str, db : Session = Depends(get_db)):
	response = db.query(booking_models.appointment).filter(booking_models.appointment.doctor_name == name,
				booking_models.appointment.date >= today).all()
	if response == []:
		return None
	return response


@app.put("/user/appointment/update/{id}", status_code = status.HTTP_200_OK, tags = ['Appointment'])
async def update_user_appointment( id : str, request : booking_schema.Appointment, db : Session = Depends(get_db)):
	response = db.query(booking_models.appointment).filter(booking_models.appointment.id == id)
	checker = db.query(booking_models.appointment).filter(booking_models.appointment.doctor_name == request.doctor_name,  
		 booking_models.appointment.time == request.time, booking_models.appointment.date == request.date).all()
	if(checker):
		return None
	response.update({ "user_name" : request.user_name, "doctor_name": request.doctor_name,
			 "patient_name": request.patient_name, "patient_gender": request.patient_gender, "patient_age": request.patient_age,
			"symptoms": request.symptoms, "date": request.date, "time": request.time})    #Very very important
	db.commit()
	return {'done'}
	# if not response.all():
	# 	return None
	
	# if(response.all()):
	# 	return None
	
	# if not response.all():
	# 	
	# return None
	# return response


@app.delete("/user/appointment/delete/{id}", status_code = status.HTTP_200_OK, tags = ['Appointment'])
async def destroy_user_appointment(id : int, db : Session = Depends(get_db)):
	response = db.query(booking_models.appointment).filter(booking_models.appointment.id == id)
	if response.all() == []:
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = f"No booking with appointment id {id} found.")
	response.delete(synchronize_session = False)
	db.commit()
	return {f"Appointment with appointment id {id} was deleted."}



# @app.post("/doctor/appointment/add", status_code = status.HTTP_201_CREATED, tags = ['Appointment'])
# async def create_doctor_appointment(request : booking_schema.Doctor_booking, db: Session = Depends(get_db)):
# 	response = booking_models.doctor_booking(doctor_name = request.doctor_name, patient_name = request.patient_name,
# 			 date = request.date, time = request.time)
# 	checker = db.query(booking_models.doctor_booking).filter(booking_models.doctor_booking.doctor_name == request.doctor_name,  
# 		 booking_models.doctor_booking.time == request.time, booking_models.doctor_booking.date == request.date).all()
# 	if(checker == []):
# 		db.add(response)
# 		db.commit()
# 		db.refresh(response)
# 		global message
# 		message = 1
# 		return response
# 	raise HTTPException(detail = f"Requested slot not available",
# 			 status_code = status.HTTP_406_NOT_ACCEPTABLE)


# @app.post("/user/appointment/add", status_code = status.HTTP_201_CREATED, tags = ['Appointment'])
# async def create_user_appointment(request : booking_schema.User_booking, db: Session = Depends(get_db)):
# 	response = booking_models.user_booking(user_name = request.user_name, patient_name = request.patient_name,
# 			 date = request.date, time = request.time)
# 	# checker = db.query(booking_models.doctor_booking).filter(booking_models.doctor_booking.date == request.date 
# 	# 	or booking_models.doctor_booking.time == request.time or booking_models.doctor_booking.patient_name == request.patient_name).all()
# 	global message
# 	if(message == 1):
# 		db.add(response)
# 		db.commit()
# 		db.refresh(response) 
# 		message = 0
# 		return response
# 	raise HTTPException(detail = f"Requested slot not available",
# 			 status_code = status.HTTP_406_NOT_ACCEPTABLE)



# @app.get("/user/appointment/{name}", status_code = status.HTTP_200_OK, tags = ['Appointment'])
# async def get_user_appointments( name:str, db : Session = Depends(get_db)):
# 	response = db.query(booking_models.user_booking).filter(booking_models.user_booking.user_name == name).all()
# 	if response == []:
# 		return (f"There are no bookings.").json()
# 	return response
	


# @app.get("/doctor/appointment/{name}", status_code = status.HTTP_200_OK, tags = ['Appointment'])
# async def get_doctor_appointments(name : str, db : Session = Depends(get_db)):
# 	response = db.query(booking_models.doctor_booking).filter(booking_models.doctor_booking.doctor_name == name).all()
# 	if response == []:
# 		return (f"There are no bookings.")
# 	return response


# @app.delete("/user/appointment/delete/{id}", status_code = status.HTTP_200_OK, tags = ['Appointment'])
# async def destroy_user_appointment(id : int, db : Session = Depends(get_db)):
# 	response = db.query(booking_models.user_booking).filter(booking_models.user_booking.id == id)
# 	if response.all() == []:
# 		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = f"No booking with appointment id {id} found.")
# 	response.delete(synchronize_session = False)
# 	db.commit()
# 	return {f"Appointment with appointment id {id} was deleted."}


# @app.delete("/doctor/appointment/delete/{id}", status_code = status.HTTP_200_OK, tags = ['Appointment'])
# async def destroy_doctor_appointment(id : int, db : Session = Depends(get_db)):
# 	response = db.query(booking_models.doctor_booking).filter(booking_models.doctor_booking.id == id)
# 	if response.all() == []:
# 		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = f"No booking with appointment id {id} found.")
# 	response.delete(synchronize_session = False)
# 	db.commit()
# 	return {f"Appointment with appointment id {id} was deleted."}


if __name__ == '__main__':
	uvicorn.run("booking_main:app", host = '127.0.0.1', port = 7000, reload = True)