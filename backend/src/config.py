from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

import os

from src.model.model import Base


class Settings:
    def __init__(self):
        if os.getenv("ENVIRONMENT") == "local":
            self.DATABASE_URI = os.getenv("DATABASE_URI_LOCAL")
        else:
            self.DATABASE_URI = os.getenv("DATABASE_URI")
        self.PAYPAL_CLIENT_ID = os.getenv("PAYPAL_CLIENT_ID")
        self.PAYPAL_CLIENT_SECRET = os.getenv("PAYPAL_CLIENT_SECRET")
        self.PAYPAL_BASE_URL = os.getenv("PAYPAL_BASE_URL")
        self.ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
        self.TOKEN_SECRET_KEY = os.getenv("TOKEN_SECRET_KEY")
        self.TOKEN_ALGORITHM = os.getenv("TOKEN_ALGORITHM")


def configure_app(app: FastAPI):
    configure_database()
    configure_cors(app)


def configure_cors(app: FastAPI):
    origins = [
        "*",
    ]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


def configure_database():
    engine = create_engine(Settings().DATABASE_URI)
    session_local = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base.metadata.create_all(bind=engine)
    return session_local()


settings = Settings()
