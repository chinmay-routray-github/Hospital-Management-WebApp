
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker



database_url = 'mysql://root:root@localhost:3306/Users'


engine = create_engine(database_url)

sessionlocal = sessionmaker(autocommit = False, autoflush = False, bind = engine)

base = declarative_base()
