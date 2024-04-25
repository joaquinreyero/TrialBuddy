from fastapi import Depends, status, APIRouter

from src.schema import trial as schema
from src.service import trial as service

router = APIRouter(
    prefix="/api/v1/trial",
    tags=['Trial']
)


@router.post("/")
def create(trial: schema.TrialInput):
    """
    Create a trial notification.
    """
    service.create(trial)
    return {"message": "Trial created successfully."}


@router.get("/{trial_id}")
def get_by_id(trial_id: int):
    """
    Get trial by id.
    """
    return service.get_by_id(trial_id)


@router.get("/{user_id}")
def get_by_user_id(user_id: int):
    """
    Get trial by user id.
    """
    return service.get_by_user_id(user_id)
