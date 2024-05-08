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


class TrialNotification(Base, IdTimeStampIsActiveMixin):
    __tablename__ = 'trial_notification'

    user_id = Column(Integer, ForeignKey('users.id'))

    trial = Column(String, nullable=False)
    email = Column(String, nullable=True)
    phone = Column(Integer, nullable=True)
    message = Column(String, nullable=True)
    url = Column(String, nullable=True)
    time_to_send = Column(String, nullable=False)
    when_to_send = Column(String, nullable=False)
    expiry_date = Column(DateTime, nullable=False)

    def __init__(self, user_id, trial, email, phone, message, url, time_to_send, when_to_send, expiry_date):
        self.user_id = user_id
        self.trial = trial
        self.email = email
        self.phone = phone
        self.message = message
        self.url = url
        self.time_to_send = time_to_send
        self.when_to_send = when_to_send
        self.expiry_date = expiry_date.replace(second=0)


class Notification(Base, IdTimeStampIsActiveMixin):
    __tablename__ = 'notification'

    trial_notification_id = Column(Integer, ForeignKey('trial_notification.id'))

    notification_date = Column(DateTime, nullable=False)

    def __init__(self, trial_notification_id, notification_date):
        self.trial_notification_id = trial_notification_id
        self.notification_date = notification_date.replace(second=0)

