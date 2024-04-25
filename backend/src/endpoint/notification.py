from fastapi import Depends, status, APIRouter

from src.service import notification as service

router = APIRouter(
    prefix="/api/v1/notification",
    tags=['Notification']
)


@router.get("/notificate")
def notificate():
    service.notificate()


@router.get("/confirm/{trial_id}")
def confirm(trial_id: int):
    service.confirm(trial_id)
