from src.repository import trial as trial_repository

from src.schema import trial as trial_schema


def create(trial: trial_schema.Request):
    """
    Sign up a user.
    """
    try:
        repository = trial_repository.TrialRepository()
        response = repository.create(trial)
        return response
    except Exception as e:
        raise e


def get_by_user(user_id: int):
    """
    Get all active trials for a user.
    """
    try:
        repository = trial_repository.TrialRepository()
        response = repository.get_by_user(user_id)
        return response
    except Exception as e:
        raise e
