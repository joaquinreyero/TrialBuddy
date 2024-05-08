from datetime import datetime

from pydantic import BaseModel


class Response(BaseModel):
    trial_id: int
    notification_date: datetime

    class Config:
        orm_mode = True
