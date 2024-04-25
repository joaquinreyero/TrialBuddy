from sqlalchemy.exc import SQLAlchemyError

from dateutil.relativedelta import relativedelta

from src.config import configure_database
from src.model import model
from src.schema import trial as schema

from datetime import datetime

class TrialRepository:

    @staticmethod
    def create(trial: schema.TrialInput):
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

            if trial.when_to_send == 'all':
                new_week_notification = model.Notification(
                    trial_notification_id=new_trial.id,
                    notification_date=trial.expiry_date - relativedelta(weeks=1)
                )
                db.add(new_week_notification)
                new_three_days_notification = model.Notification(
                    trial_notification_id=new_trial.id,
                    notification_date=trial.expiry_date - relativedelta(days=3)
                )
                db.add(new_three_days_notification)
                new_day_notification = model.Notification(
                    trial_notification_id=new_trial.id,
                    notification_date=trial.expiry_date - relativedelta(days=1)
                )
                db.add(new_day_notification)
            elif trial.when_to_send == 'one-week':
                new_week_notification = model.Notification(
                    trial_notification_id=new_trial.id,
                    notification_date=trial.expiry_date - relativedelta(weeks=1)
                )
                db.add(new_week_notification)
            elif trial.when_to_send == 'three-days':
                new_three_days_notification = model.Notification(
                    trial_notification_id=new_trial.id,
                    notification_date=trial.expiry_date - relativedelta(days=3)
                )
                db.add(new_three_days_notification)
            elif trial.when_to_send == 'one-day':
                new_day_notification = model.Notification(
                    trial_notification_id=new_trial.id,
                    notification_date=trial.expiry_date - relativedelta(days=1)
                )
                db.add(new_day_notification)
            db.commit()
            return new_trial
        except SQLAlchemyError as e:
            db.rollback()
            raise e

    def create_notifications(self, db, when_to_send: str, trial_id: int, expiry_date: datetime):
        if when_to_send == 'all':
            new_week_notification = model.Notification(
                trial_notification_id=trial_id,
                notification_date=expiry_date - relativedelta(weeks=1)
            )
            db.add(new_week_notification)
            new_three_days_notification = model.Notification(
                trial_notification_id=trial_id,
                notification_date=expiry_date - relativedelta(days=3)
            )
            db.add(new_three_days_notification)
            new_day_notification = model.Notification(
                trial_notification_id=trial_id,
                notification_date=expiry_date - relativedelta(days=1)
            )
            db.add(new_day_notification)
        elif when_to_send == 'one-week':
            new_week_notification = model.Notification(
                trial_notification_id=trial_id,
                notification_date=expiry_date - relativedelta(weeks=1)
            )
            db.add(new_week_notification)
        elif when_to_send == 'three-days':
            new_three_days_notification = model.Notification(
                trial_notification_id=trial_id,
                notification_date=expiry_date - relativedelta(days=3)
            )
            db.add(new_three_days_notification)
        elif when_to_send == 'one-day':
            new_day_notification = model.Notification(
                trial_notification_id=trial_id,
                notification_date=expiry_date - relativedelta(days=1)
            )
            db.add(new_day_notification)
        return db

    @staticmethod
    def get_by_id(trial_id: int):
        db = configure_database()
        try:
            trial = db.query(model.TrialNotification).filter(model.TrialNotification.id == trial_id).first()
            return trial
        except SQLAlchemyError as e:
            raise e

    @staticmethod
    def get_by_user_id(user_id: int):
        db = configure_database()
        try:
            trials = db.query(model.TrialNotification).filter(model.TrialNotification.user_id == user_id).all()
            return trials
        except SQLAlchemyError as e:
            raise e
