from src.repository import trial as trial_repository
from src.repository import notification as notification_repository
from src.utils import email

from datetime import datetime


def confirm(trial_id: int):
    """
    Delete all notifications related to a trial ID and set the trial as inactive with confirm_by_trial_id.

    Args:
        trial_id (schema.TrialInput): The trial information.

    Returns:
        int: The ID of the trial that was confirmed.

    Raises:
        SQLAlchemyError: If an error occurs during database operations.
    """
    try:
        repository = notification_repository.NotificationRepository
        return repository.confirm_by_trial_id(trial_id)
    except Exception as e:
        raise e


async def notificate(date: datetime):
    """
    Send a notification to all Notification that has the notification_date set equal to the current date.

    Args:


    Returns:
        list: A list of notification_id that were sent.

    Raises:
        SQLAlchemyError: If an error occurs during database operations.
    """
    try:
        repository = trial_repository.TrialRepository()
        trials_notification = repository.get_trials(date)
        if trials_notification:
            for trial in trials_notification:
                data = {
                    "trial": trial.trial,
                    "email": trial.email,
                    "expiry_date": trial.expiry_date,
                    "url": trial.url if trial.url else None,
                    "message": trial.message if trial.message else None,
                }
                await email.send_confirmation_email(data)
            return trials_notification
        else:
            return "no notifications to send"
    except Exception as e:
        raise e
