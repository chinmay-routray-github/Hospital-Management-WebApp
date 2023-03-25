from sqlalchemy import Column, String, Integer
from user_database import base

class user(base):
    __tablename__ = 'users'
    id = Column(Integer, index = True, primary_key = True)
    name = Column(String(50))
    email = Column(String(50))
    password = Column(String(300))
    phone = Column(String(50))
    question = Column(String(50))
    answer = Column(String(50))



    




	