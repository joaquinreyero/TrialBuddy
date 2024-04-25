from src.repository import notification as notification_repository


def confirm(trial_id: int):
    """
    Confirm a trial.
    """
    try:
        repository = notification_repository.NotificationRepository()
        return repository.confirm(trial_id)
    except Exception as e:
        raise e


def notificate():
    """
    Notificate a trial.
    """
    try:
        repository = notification_repository.NotificationRepository()
        trials = repository.get_trials()

        return repository.notificate()
    except Exception as e:
        raise e
