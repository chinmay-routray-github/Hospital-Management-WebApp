import requests

url = "http://127.0.0.1:8000/user/"


def test_user_login():
    payload = {
        "username" : "Arun",
        "password" : "Gaming@Arun"
    }
    response = requests.post(url + "login", json = payload)
    assert response.status_code == 201
    token = response.json()["access_token"]
    assert token != None

    if token:
        username = requests.get(url + f"username/{token}")
        assert username.status_code == 200
        assert username.json() == payload["username"] 


def test_user_secured_endpoints():
    data = signup_data()
    post_response = requests.post(url + "add", json = data)
    assert post_response.status_code == 201
    payload = {
        "username" : data["name"],
        "password" : data["password"]
    }
    name = get_username(payload)
    token = get_token(payload)

    #1 test user_short_info
    short_info_response = requests.get(url + f"short_info/{name}", 
            headers = {"authorization" : "bearer "+ token})
    assert short_info_response.status_code == 200
    assert short_info_response.json()[0]["email"] == data["email"]

    #2 test user_info
    info_response = requests.get(url + f"info/{name}", headers = {"authorization" : "bearer "+ token})
    assert info_response.status_code == 200
    assert info_response.json()[0]["phone"] == data["phone"]

    #3 test delete_user
    delete_response = requests.delete(url + f"delete/{name}", 
            headers = {"authorization" : "bearer "+ token})
    assert delete_response.status_code == 200
    assert get_token(payload) == None


def test_user_appointments():
    data = signup_data()
    post_response = requests.post(url + "add", json = data)
    payload = {
        "username" : data["name"],
        "password" : data["password"]
    }
    name = get_username(payload)
    token = get_token(payload)
    appointment_data = booking_data()

    #1 test post appointment
    new_appointment = requests.post(url + "appointment/new", json = appointment_data, 
            headers = {"authorization" : "bearer "+ token})
    assert new_appointment.status_code == 200

    #2 test get appointment
    get_appointment = requests.get(url + f"appointment/get/{name}", 
            headers = {"authorization" : "bearer "+ token} )
    assert get_appointment.status_code == 200
    assert get_appointment.json()[0]["user_name"] == payload["username"]
    
    #3 test delete appointment
    booking_id = get_appointment.json()[0]["id"]
    delete_response = requests.delete(url + f"appointment/delete/{booking_id}",
             headers = {"authorization" : "bearer "+ token})
    assert delete_response.status_code == 200
    checker = requests.get(url + f"appointment/get/{name}", 
            headers = {"authorization" : "bearer "+ token} )
    assert checker.json()[0]["date"] == None
    

    delete_response = requests.delete(url + f"delete/{name}", 
            headers = {"authorization" : "bearer "+ token})

def get_token(payload):
    response = requests.post(url + "login", json = payload)
    token = response.json()["access_token"]
    return token


def get_username(payload):
    token = get_token(payload)
    username = requests.get(url + f"username/{token}")
    return username.json()


def signup_data():
    return {
    "name": "Ranjan Verma",
    "email": "raju2023@gmail.com",
    "password": "rajuisgentleman",
    "phone": "7978641415",
    "question": "birth city",
    "answer": "Bangalore"
}


def booking_data():
    return{
    "user_name" : "Ranjan Verma",
	"doctor_name" : "Madhav",
	"patient_name" : "Shruti Das",
	"patient_gender" : "Female",
	"patient_age" : "24",
	"symptoms" : "Severe headache",
	"date" : "2023-03-26",
	"time" : "14:00-15:00",
    }