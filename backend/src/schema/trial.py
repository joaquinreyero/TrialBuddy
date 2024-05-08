from pydantic import BaseModel, field_validator, Field, EmailStr
from typing import Optional, List
from datetime import datetime

from src.schema import notification


class Request(BaseModel):
    user_id: int
    trial: str = Field(min_length=3, max_length=50)
    email: Optional[EmailStr] = None
    phone: Optional[int] = None
    message: Optional[str] = Field(min_length=3, max_length=100)
    url: Optional[str] = Field(min_length=3, max_length=100)
    time_to_send: str
    when_to_send: str
    expiry_date: datetime

    @field_validator('time_to_send')
    def validate_time_to_send_format(cls, value):
        try:
            datetime.strptime(value, '%H:%M')
        except ValueError:
            raise ValueError("Invalid format")
        return value

    @field_validator('when_to_send')
    def validate_when_to_send_format(cls, value):
        when_to_send_options = ['all', 'one-week', 'three-days', 'one-day']
        try:
            if value not in when_to_send_options:
                raise ValueError("Invalid value")
        except ValueError:
            raise ValueError("Invalid value")
        return value

    @classmethod
    def set_expiry_date(cls, time_to_send: str, expiry_date: datetime) -> datetime:
        hour, minute = time_to_send.split(':')
        hour = int(hour)
        minute = int(minute)
        expiry_date = expiry_date.replace(hour=hour, minute=minute, second=0)
        return expiry_date

    def __init__(self, **data):
        super().__init__(**data)
        self.expiry_date = self.set_expiry_date(self.time_to_send, self.expiry_date)

    class Config:
        orm_mode = True


class RequestList(BaseModel):
    requests: List[Request]


class Response(Request):
    notifications: list[notification.Response]
