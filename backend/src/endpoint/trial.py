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


