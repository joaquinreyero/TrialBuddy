from sqlalchemy.exc import SQLAlchemyError
from dateutil.relativedelta import relativedelta
from datetime import datetime

from src.config import configure_database
from src.model import model


class PaymentRepository:

    @staticmethod
    def create(capture_response, user_id: int) -> int:
        """
        Create a payment record for a user.

        Args:
            capture_response (json): The response of the payment capture.
            user_id (int): The ID of the user.

        Returns:
            int: The ID of the payment record.

        Raises:
            SQLAlchemyError: If an error occurs during database operations.
        """
        db = configure_database()
        try:
            order_data = model.Payment(
                user_id=user_id,
                status=capture_response["status"],
                payment_email=capture_response["payment_source"]["paypal"]["email_address"],
                payment_account_id=capture_response["payment_source"]["paypal"]["account_id"],
                payment_account_status=capture_response["payment_source"]["paypal"]["account_status"],
                payment_given_name=capture_response["payment_source"]["paypal"]["name"]["given_name"],
                payment_surname=capture_response["payment_source"]["paypal"]["name"]["surname"],
                payment_country_code=capture_response["payment_source"]["paypal"]["address"]["country_code"],
                unit_reference_id=capture_response["purchase_units"][0]["reference_id"],
                shipping_full_name=capture_response["purchase_units"][0]["shipping"]["name"]["full_name"],
                shipping_address_line_1=capture_response["purchase_units"][0]["shipping"]["address"]["address_line_1"],
                shipping_admin_area_2=capture_response["purchase_units"][0]["shipping"]["address"]["admin_area_2"],
                shipping_admin_area_1=capture_response["purchase_units"][0]["shipping"]["address"]["admin_area_1"],
                shipping_postal_code=capture_response["purchase_units"][0]["shipping"]["address"]["postal_code"],
                shipping_country_code=capture_response["purchase_units"][0]["shipping"]["address"]["country_code"],
                payment_capture_id=capture_response["purchase_units"][0]["payments"]["captures"][0]["id"],
                payment_capture_status=capture_response["purchase_units"][0]["payments"]["captures"][0]["status"],
                payment_capture_amount_value=capture_response["purchase_units"][0]["payments"]["captures"][0]["amount"][
                    "value"],
                payment_capture_currency_code=
                capture_response["purchase_units"][0]["payments"]["captures"][0]["amount"]["currency_code"],
                payment_capture_final=capture_response["purchase_units"][0]["payments"]["captures"][0]["final_capture"],
                payment_capture_seller_protection_status=
                capture_response["purchase_units"][0]["payments"]["captures"][0]["seller_protection"]["status"],
                payment_capture_dispute_categories=','.join(
                    capture_response["purchase_units"][0]["payments"]["captures"][0]["seller_protection"][
                        "dispute_categories"]),
                payment_capture_gross_amount_value=
                capture_response["purchase_units"][0]["payments"]["captures"][0]["seller_receivable_breakdown"][
                    "gross_amount"]["value"],
                payment_capture_paypal_fee_value=
                capture_response["purchase_units"][0]["payments"]["captures"][0]["seller_receivable_breakdown"][
                    "paypal_fee"]["value"],
                payment_capture_net_amount_value=
                capture_response["purchase_units"][0]["payments"]["captures"][0]["seller_receivable_breakdown"][
                    "net_amount"]["value"],
                payment_capture_self_link=capture_response["purchase_units"][0]["payments"]["captures"][0]["links"][0][
                    "href"],
                payment_capture_refund_link=
                capture_response["purchase_units"][0]["payments"]["captures"][0]["links"][1]["href"],
                payment_capture_up_link=capture_response["purchase_units"][0]["payments"]["captures"][0]["links"][2][
                    "href"],
                payment_capture_create_time=datetime.strptime(
                    capture_response["purchase_units"][0]["payments"]["captures"][0]["create_time"],
                    "%Y-%m-%dT%H:%M:%SZ"),
                payment_capture_update_time=datetime.strptime(
                    capture_response["purchase_units"][0]["payments"]["captures"][0]["update_time"],
                    "%Y-%m-%dT%H:%M:%SZ"),
                payer_given_name=capture_response["payer"]["name"]["given_name"],
                payer_surname=capture_response["payer"]["name"]["surname"],
                payer_email=capture_response["payer"]["email_address"],
                payer_id=capture_response["payer"]["payer_id"],
                payer_country_code=capture_response["payer"]["address"]["country_code"],
                order_self_link=capture_response["links"][0]["href"],
                order_method=capture_response["links"][0]["method"]
            )
            db.add(order_data)
            db.commit()
            return order_data.id
        except SQLAlchemyError as e:
            db.rollback()
            raise e

    @staticmethod
    def create_order(user_id: int, order_id: str) -> int:
        """
        Create an order record for a user.

        Args:
            user_id (int): The ID of the user.
            order_id (str): The ID of the order.

        Returns:
            int: The ID of the order record.

        Raises:
            SQLAlchemyError: If an error occurs during database operations.
        """
        db = configure_database()
        try:
            order_data = model.Order(
                user_id=user_id,
                order_id=order_id,
            )
            db.add(order_data)
            db.commit()
            return order_data.id
        except SQLAlchemyError as e:
            db.rollback()
            raise e

    @staticmethod
    def get_by_order_id(order_id: str) -> model.Order:
        """
        Get an order by its ID.

        Args:
            order_id (str): The ID of the order.

        Returns:
            model.Order: The order object.

        Raises:
            SQLAlchemyError: If an error occurs during database operations.
        """
        db = configure_database()
        try:
            order = db.query(model.Order).filter(model.Order.order_id == order_id).first()
            if order:
                return order.user_id
            else:
                print("Order not found.")
        except SQLAlchemyError as e:
            db.rollback()
            raise e

    @staticmethod
    def update_payment(user_id: int, is_paid: bool) -> int:
        """
        Update the payment status of a user.

        Args:
            user_id (int): The ID of the user.
            is_paid (bool): The payment status.

        Returns:
            int: The ID of the user.

        Raises:
            SQLAlchemyError: If an error occurs during database operations.
        """
        db = configure_database()
        try:
            user = db.query(model.User).filter(model.User.id == user_id).first()
            if user:
                user.is_paid = is_paid
                db.commit()
                return user.id
            else:
                print("User not found.")
        except SQLAlchemyError as e:
            db.rollback()
            raise e