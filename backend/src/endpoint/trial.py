from fastapi import Depends, status, APIRouter

from src.schema import trial as schema
from src.service import trial as service

router = APIRouter(
    prefix="/api/v1/trial",
    tags=['Trial']
)


@router.post("/")
def create(trial: schema.Request):
    """
    Create a trial notification.
    """
    return service.create(trial)


@router.get("/{user_id}")
def get_by_user(user_id: int):
    """
    Get all active trials for a user.
    """
    return service.get_by_user(user_id)
