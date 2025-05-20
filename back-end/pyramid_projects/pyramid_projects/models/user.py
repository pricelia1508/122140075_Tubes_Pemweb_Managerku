from sqlalchemy import Column, String
from .meta import Base

from passlib.hash import bcrypt

class User(Base):
    __tablename__ = 'users'

    id = Column(String, primary_key=True)
    username = Column(String, nullable=False, unique=True)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    
    def set_password(self, raw_password):
        self.password = bcrypt.hash(raw_password)

    def check_password(self, raw_password):
        return bcrypt.verify(raw_password, self.password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "password": self.password,
        }

    def __repr__(self):
        return f"<User(username='{self.username}', email='{self.email}')>"
