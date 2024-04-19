from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean, Text
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()


class IdTimeStampIsActiveMixin:
    id = Column(Integer, primary_key=True, autoincrement=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)


class Users(Base, IdTimeStampIsActiveMixin):
    __tablename__ = "users"

    email = Column(String(100), nullable=False, unique=True)
    password = Column(String(100), nullable=False)


class Token(Base, IdTimeStampIsActiveMixin):
    __tablename__ = 'token'

    user_id = Column(Integer, ForeignKey('users.id'))

    token = Column(String, nullable=False, unique=True)
    expiration_date = Column(DateTime, default=datetime.utcnow(), nullable=False)
