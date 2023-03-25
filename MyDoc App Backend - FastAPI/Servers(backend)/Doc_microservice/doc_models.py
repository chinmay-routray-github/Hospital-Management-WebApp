from sqlalchemy import Column, String, Integer
from doc_database import base

class doctor(base):
    __tablename__ = 'doctors'
    id = Column(Integer, index = True, primary_key = True)
    name = Column(String(50))
    email = Column(String(50))
    password = Column(String(300))
    phone = Column(String(50))
    specialization = Column(String(50))
    experience = Column(Integer)


	