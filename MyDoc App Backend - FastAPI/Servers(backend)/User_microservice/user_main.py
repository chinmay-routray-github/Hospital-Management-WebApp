from fastapi import FastAPI, Depends, status, HTTPException, Response
from typing import Union, List
from pydantic import BaseModel
import user_models
from user_database import engine, base, sessionlocal
import uvicorn
from hashing import Hash
from sqlalchemy.orm import Session
import user_schema
import JWTtoken
from oauth2 import get_current_user
from fastapi.security import OAuth2PasswordRequestForm
import httpx
from fastapi.middleware.cors import CORSMiddleware
from jose import jwt



user_models.base.metadata.create_all(engine)
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


@app.get("/user/info/{name}", status_code = status.HTTP_200_OK, tags = ['user'])
async def get_a_user( name : str, db : Session = Depends(get_db),
		get_current_user: user_schema.User = Depends(get_current_user)):
   
	response = db.query(user_models.user).filter(user_models.user.name == name).all()
	if response == []:
		raise HTTPException(detail = f"User with name {name}, not found." , status_code = status.HTTP_404_NOT_FOUND)
	return response
	


@app.get("/user/short_info/{name}", status_code = status.HTTP_200_OK, response_model = List[user_schema.user_short], tags = ['user'])
async def get_a_short_info(name : str, db : Session = Depends(get_db),
		get_current_user: user_schema.User = Depends(get_current_user)):
	response = db.query(user_models.user).filter(user_models.user.name == name).all()
	if response == []:
		raise HTTPException(detail = f"User with name {name}, not found." , status_code = status.HTTP_404_NOT_FOUND)
	return response


@app.post("/user/add", status_code = status.HTTP_201_CREATED, tags = ['user'])
async def create_user(request : user_schema.User, db: Session = Depends(get_db)):
	response = user_models.user(name = request.name, email = request.email, password = Hash.bcrypt(request.password),
			 phone = request.phone, question = request.question, answer = request.answer)
	checker = db.query(user_models.user).filter(user_models.user.name == request.name).all()
	if(checker == []):
		db.add(response)
		db.commit()
		db.refresh(response)
		return response
	# raise HTTPException(detail = f"{request.name} already exists. Please choose a different name",
	# 		 status_code = status.HTTP_406_NOT_ACCEPTABLE)
	return None


@app.put("/user/update/{name}", status_code = status.HTTP_200_OK, tags = ['user'])
async def update_user( name : str, request : user_schema.User, db : Session = Depends(get_db),
		get_current_user: user_schema.User = Depends(get_current_user)):
	response = db.query(user_models.user).filter(user_models.user.name == name)
	if not response.all():
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = f"user with name {name} not there.")
	response.update({"name": request.name, "email" : request.email, "password": Hash.bcrypt(request.password),
			 "phone": request.phone, "question": request.question, "answer": request.answer})    #Very very important
	db.commit()
	return response


@app.delete("/user/delete/{name}", status_code = status.HTTP_200_OK, tags = ['user'])
async def destroy(name : str, db : Session = Depends(get_db), get_current_user: user_schema.User = Depends(get_current_user)):
	response = db.query(user_models.user).filter(user_models.user.name == name)
	if response.all() == []:
		raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = f"user with name {name} not found.")
	response.delete(synchronize_session = False)
	db.commit()
	return {f"user entry with name {name} was deleted."}


@app.post("/user/login", status_code = status.HTTP_201_CREATED, tags = ['Authentication'])
async def Userlogin(request: user_schema.user_login,
	#  request : OAuth2PasswordRequestForm = Depends(), 
	 db: Session = Depends(get_db)):
	response = db.query(user_models.user).filter(user_models.user.name == request.username).first()
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


@app.get("/user/username/{token}", status_code = status.HTTP_200_OK, tags = ['Authentication'])
async def get_username(token : str):
	username  = jwt.decode(token, JWTtoken.SECRET_KEY, algorithms = [JWTtoken.ALGORITHM])
	return username["sub"]


@app.get("/user/appointment/get/{name}", status_code = status.HTTP_200_OK, tags = ['User Appointment'])
async def get_user_appointment(name : str, get_current_user: user_schema.User = Depends(get_current_user)):
	response = httpx.get("http://127.0.0.1:7000/user/appointment/"+name)
	return response.json()


@app.delete("/user/appointment/delete/{id}", status_code = status.HTTP_200_OK, tags = ['User Appointment'])
async def delete_appointment(id : str, get_current_user: user_schema.User = Depends(get_current_user)):
	response = httpx.delete("http://127.0.0.1:7000/user/appointment/delete/"+ id)
	# b = httpx.delete("http://127.0.0.1:7000/doctor/appointment/delete/"+ id)
	return response.json()


@app.post("/user/appointment/new", status_code = status.HTTP_200_OK, tags = ['User Appointment'])
async def create_appointment(request : user_schema.Booking,
		get_current_user: user_schema.User = Depends(get_current_user)):
	# httpx.post("http://127.0.0.1:7000/doctor/appointment/add", data = request2.json())
	response = httpx.post("http://127.0.0.1:7000/user/appointment/add", data = request.json())
	return response.json()


@app.put("/user/appointment/modify/{id}", status_code = status.HTTP_200_OK, tags = ['User Appointment'])
async def update_appointment(id : str, request : user_schema.Booking,
		get_current_user: user_schema.User = Depends(get_current_user)):
	# httpx.post("http://127.0.0.1:7000/doctor/appointment/add", data = request2.json())
	response = httpx.put("http://127.0.0.1:7000/user/appointment/update/"+ id, data = request.json())
	return response.json()

	

if __name__ == '__main__':
	uvicorn.run("user_main:app", host = '127.0.0.1', port = 8000, reload = True)