from sqlalchemy.exc import SQLAlchemyError

from src.config import configure_database
from src.model import model


class NotificationRepository:

    @staticmethod
    def confirm(trial_id: int):
        db = configure_database()
        try:
            notifications = db.query(model.Notification).filter(model.Notification.trial_notification_id == trial_id).all()
            for notification in notifications:
                db.delete(notification)
            trial = db.query(model.TrialNotification).filter(model.TrialNotification.id == trial_id).first()
            trial.is_active = False
            db.commit()
        except SQLAlchemyError as e:
            db.rollback()
            raise e

    @staticmethod
    def get_trials():
        db = configure_database()
        try:
            actual_time = datetime.now()
            trials = db.query(model.Notification).filter(model.Notification.notification_date == actual_time).all()
        except SQLAlchemyError as e:
            raise e
