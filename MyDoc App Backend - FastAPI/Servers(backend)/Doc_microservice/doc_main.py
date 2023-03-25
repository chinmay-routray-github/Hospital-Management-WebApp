from fastapi import FastAPI, Depends, status, HTTPException, Response
from typing import Union, List
from pydantic import BaseModel
import doc_models
from doc_database import engine, base, sessionlocal
import uvicorn
from hashing import Hash
from sqlalchemy.orm import Session
import doc_schema
import JWTtoken
from oauth2 import get_current_user
from fastapi.security import OAuth2PasswordRequestForm
import httpx
from fastapi.middleware.cors import CORSMiddleware
from jose import jwt

doc_models.base.metadata.create_all(engine)



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


# by doctor
@app.get("/doctor/info/{name}", status_code = status.HTTP_200_OK, tags = ['doctor'])
async def get_a_doctor(name : str, db : Session = Depends(get_db),
		get_current_user: doc_schema.Doctor = Depends(get_current_user)):
	response = db.query(doc_models.doctor).filter(doc_models.doctor.name == name).all()
	if response == []:
		raise HTTPException(detail = f"Doctor with name {name}, not found." , status_code = status.HTTP_404_NOT_FOUND)
	return response


# by user
@app.get("/doctor/all_short_info", status_code = status.HTTP_200_OK, response_model = List[doc_schema.doc_short], tags = ['doctor'])
async def get_short(db : Session = Depends(get_db)):
	response = db.query(doc_models.doctor).all()
	return response

# by doctor
@app.get("/doctor/short_info/{name}", status_code = status.HTTP_200_OK, response_model = List[doc_schema.doc_short], tags = ['doctor'])
async def get_a_short_info(name : str, db : Session = Depends(get_db),
		get_current_user: doc_schema.Doctor = Depends(get_current_user)):
	response = db.query(doc_models.doctor).filter(doc_models.doctor.name == name).all()
	if response == []:
		raise HTTPException(detail = f"Doctor with name {name}, not found." , status_code = status.HTTP_404_NOT_FOUND)
	return response


@app.post("/doctor/add", status_code = status.HTTP_201_CREATED, tags = ['doctor'])
async def create_doc(request : doc_schema.Doctor, db: Session = Depends(get_db)):
	response = doc_models.doctor(name = request.name, email = request.email, password = Hash.bcrypt(request.password),
			 phone = request.phone, specialization = request.specialization, experience = request.experience)
	checker = db.query(doc_models.doctor).filter(doc_models.doctor.name == request.name).all()
	if(checker == []):
		db.add(response)
		db.commit()
		db.refresh(response)
		return response
	raise HTTPException(detail = f"{request.name} already exists. Please choose a different name",
			 status_code = status.HTTP_406_NOT_ACCEPTABLE)
	
	

#  by doctor
@app.put("/doctor/update/{name}", status_code = status.HTTP_200_OK, tags = ['doctor'])
async def update_doc( name : str, request : doc_schema.Doctor, db : Session = Depends(get_db),
		get_current_user: doc_schema.Doctor = Depends(get_current_user)):
	response = db.query(doc_models.doctor).filter(doc_models.doctor.name == name)
	if not response.all():
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = f"Doctor with name {name} not there.")
	response.update({"name": request.name, "email" : request.email, "password": Hash.bcrypt(request.password),
			 "phone": request.phone, "specialization": request.specialization, "experience": request.experience})    #Very very important
	db.commit()
	return response


#  by doctor
@app.delete("/doctor/delete/{name}", status_code = status.HTTP_200_OK, tags = ['doctor'])
async def destroy(name : str, db : Session = Depends(get_db), 
		get_current_user: doc_schema.Doctor = Depends(get_current_user)):
	response = db.query(doc_models.doctor).filter(doc_models.doctor.name == name)
	if response.all() == []:
		raise HTTPException(status_code = 404, detail = f"Doctor with name {name} not found.")
	response.delete(synchronize_session = False)
	db.commit()
	return {f"Doctor entry with name {name} was deleted."}


@app.post("/doc/login", status_code = status.HTTP_201_CREATED, tags = ['Authentication'])
async def Userlogin(request : doc_schema.doc_login,
		# request : OAuth2PasswordRequestForm = Depends(), 
		db: Session = Depends(get_db)):
	response = db.query(doc_models.doctor).filter(doc_models.doctor.name == request.username).first()
	if not response :
		# raise HTTPException(detail = f"{request.username} does not exist. Please try again",
		# 	 status_code = status.HTTP_404_NOT_FOUND)
		return {"access_token" : None}
	if not Hash.verify(response.password, request.password):
		# raise HTTPException(detail = f"Incorrect Password",
		# 	 status_code = status.HTTP_404_NOT_FOUND)
		return {"access_token" : None}


	access_token = JWTtoken.create_access_token(data={"sub": response.name})
	return {"access_token": access_token, "token_type": "bearer"}


@app.get("/doctor/username/{token}", status_code = status.HTTP_200_OK, tags = ['Authentication'])
def get_username(token : str):
	username = jwt.decode(token, JWTtoken.SECRET_KEY, algorithms = [JWTtoken.ALGORITHM])
	return username["sub"]


@app.get("/doctor/appointment/get/{name}", status_code = status.HTTP_200_OK, tags = ['Doctor Appointment'])
async def get_doctor_appointment(name : str, get_current_user: doc_schema.Doctor = Depends(get_current_user)):
	response = httpx.get("http://127.0.0.1:7000/doctor/appointment/"+name)
	return response.json()


if __name__ == '__main__':
	uvicorn.run("doc_main:app", host = '127.0.0.1', port = 9000, reload = True)