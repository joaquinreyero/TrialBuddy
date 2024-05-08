from sqlalchemy.exc import SQLAlchemyError

from datetime import datetime

from src.config import configure_database
from src.model import model
from src.schema import trial as schema
from src.repository.notification import NotificationRepository

from typing import List


class TrialRepository:

    @staticmethod
    def create(trial: schema.Request) -> model.TrialNotification:
        """
        Create a new trial notification and the associated notifications.

        Args:
            trial (schema.TrialInput): The trial information.

        Returns:
            model.TrialNotification: The newly created trial notification.

        Raises:
            SQLAlchemyError: If an error occurs during database operations.
        """
        db = configure_database()
        try:
            new_trial = model.TrialNotification(
                user_id=trial.user_id,
                trial=trial.trial,
                email=trial.email or None,
                phone=trial.phone or None,
                message=trial.message or None,
                url=trial.url or None,
                time_to_send=trial.time_to_send,
                when_to_send=trial.when_to_send,
                expiry_date=trial.expiry_date
            )
            db.add(new_trial)
            db.commit()
            db.refresh(new_trial)

            NotificationRepository.create_notifications(new_trial.id, trial.when_to_send,
                                                        trial.expiry_date)

            return new_trial

        except SQLAlchemyError as e:
            db.rollback()
            raise e

    @staticmethod
    def get_trials(date: datetime) -> List[model.TrialNotification]:
        """
        Get all trials that have notification_date equal to the date of Args

        Args:
            date: date to compare against expiry date

        Returns:
            list: A list of all trials.

        Raises:
            SQLAlchemyError: If an error occurs during database operations.
        """
        db = configure_database()
        try:
            trials_notification = []
            notifications = db.query(model.Notification).filter(
                model.Notification.notification_date == date).all()
            if notifications:
                for notification in notifications:
                    trial_notification = db.query(model.TrialNotification).filter(
                        model.TrialNotification.id == notification.trial_notification_id).first()
                    if trial_notification:
                        trials_notification.append(trial_notification)
            return trials_notification

        except SQLAlchemyError as e:
            raise e
