import requests

url = "http://127.0.0.1:9000/"
number_of_doctors = 4

def test_doctor_list():
    response = requests.get(url + "doctor/all_short_info")
    assert response.status_code == 200
    assert len(response.json()) == number_of_doctors 


def test_doctor_login():
    payload = {
        "username" : "Aman",
        "password" : "amanKumar"
    }
    response = requests.post(url + "doc/login", json = payload)
    assert response.status_code == 201
    token = response.json()['access_token']
    assert token != None

    if token:
        username = requests.get(url + f"doctor/username/{token}")
        assert username.status_code == 200
        assert username.json() == payload["username"]


def test_doctor_secured_endpoints():
    data = signup_data()
    new_doctor_response = requests.post(url + "doctor/add", json = data)
    assert new_doctor_response.status_code == 201
    
    payload = {
        "username" : data["name"],
        "password" : data["password"]
    }
    name = get_username(payload)
    token = get_token(payload)

    #1 doctor info test
    response = requests.get(url + f"doctor/info/{name}", headers = {'authorization' : 'bearer '+ token})
    # print(response.json()[0]["email"])       test statement
    assert response.status_code == 200
    assert response.json()[0]["phone"] == data["phone"]
    assert response.json()[0]["specialization"] == data["specialization"]
    
    #2 doctor short info test
    short_info_response = requests.get(url + f"doctor/short_info/{name}", 
                headers = {"authorization" : "bearer "+ token})
    assert short_info_response.status_code == 200
    assert short_info_response.json()[0]["email"] == data["email"]

    #3 doctor delete info test
    delete_response = requests.delete(url + f"doctor/delete/{name}", 
                headers = {"authorization" : "bearer "+ token})
    assert delete_response.status_code == 200
    assert get_token(payload) == None

# doctor appointment info test
def test_doctor_appointment():
    payload = {
        "username" : "Aman",
        "password" : "amanKumar"
    }
    name = get_username(payload)
    token = get_token(payload)
    appointment_response = requests.get(url + f"doctor/appointment/get/{name}",
             headers = {"authorization" : "bearer "+ token})
    assert appointment_response.status_code == 200
    assert appointment_response.json()[0]["doctor_name"] == payload["username"]


def get_token(payload):
    response = requests.post(url + "doc/login", json = payload)
    token = response.json()['access_token']
    return token


def get_username(payload):
    token = get_token(payload)
    username = requests.get(url + f"doctor/username/{token}")
    return username.json()


def signup_data():
    return {
    "name": "Rahul Malhotra",
    "email": "rahul@yahoo.co.in",
    "password": "nameisRahul",
    "phone": "7978656407",
    "specialization": "General Physician",
    "experience": 8
}


