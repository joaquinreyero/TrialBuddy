from sqlalchemy.exc import SQLAlchemyError
from dateutil.relativedelta import relativedelta
from datetime import datetime

from src.config import configure_database
from src.model import model


class NotificationRepository:

    @staticmethod
    def confirm_by_trial_id(trial_id: int) -> int:
        """
        Delete all notifications related to a trial ID and set the trial as inactive.

        Args:
            trial_id (int): The ID of the trial.

        Returns:
            int: The ID of the trial that was confirmed.

        Raises:
            SQLAlchemyError: If an error occurs during database operations.
        """
        db = configure_database()
        try:
            notifications = db.query(model.Notification).filter(
                model.Notification.trial_notification_id == trial_id).all()
            for notification in notifications:
                db.delete(notification)
            trial = db.query(model.TrialNotification).filter(model.TrialNotification.id == trial_id).first()
            trial.is_active = False
            db.commit()
            return trial.id
        except SQLAlchemyError as e:
            db.rollback()
            raise e

    @staticmethod
    def create_notifications(trial_id: int, when_to_send: str, expiry_date: datetime) -> list:
        """
        Create notifications based on the trial expiry date and when to send.

        Args:
            trial_id (int): The ID of the trial.
            when_to_send (str): The timing for sending notifications (all,one-week,three-days,one-day).
            expiry_date (datetime): The expiry date of the trial.

        Returns:
            list: A list of created notifications.

        Raises:
            SQLAlchemyError: If an error occurs during database operations.
        """
        db = configure_database()
        try:
            notification_mappings = {
                'all': [relativedelta(weeks=1), relativedelta(days=3), relativedelta(days=1)],
                'one-week': [relativedelta(weeks=1)],
                'three-days': [relativedelta(days=3)],
                'one-day': [relativedelta(days=1)]
            }

            notifications = notification_mappings.get(when_to_send, [])
            created_notifications = []

            for delta in notifications:
                new_notification = model.Notification(
                    trial_notification_id=trial_id,
                    notification_date=expiry_date - delta
                )
                db.add(new_notification)
                created_notifications.append(new_notification)

            db.commit()
            return created_notifications

        except SQLAlchemyError as e:
            db.rollback()
            raise e
