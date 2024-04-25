from src.utils import errors
from src.schema import trial as schema
from src.repository import trial as trial_repository


def create(trial: schema.TrialInput):
    """
    Sign up a user.
    """
    try:
        repository = trial_repository.TrialRepository()
        return repository.create(trial)
    except Exception as e:
        raise e


def get_by_id(trial_id: int):
    """
    Get trial by id.
    """
    try:
        repository = trial_repository.TrialRepository()
        return repository.get_by_id(trial_id)
    except Exception as e:
        raise e


def get_by_user_id(user_id: int):
    """
    Get trial by user id.
    """
    try:
        repository = trial_repository.TrialRepository()
        return repository.get_by_user_id(user_id)
    except Exception as e:
        raise e
