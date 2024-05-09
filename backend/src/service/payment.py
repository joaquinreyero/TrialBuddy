from src.repository import payment as payment_repository
from src.utils import payment as utils


def create_order(user_id: int):
    """
    Create an order on PayPal.
    """
    try:
        repository = payment_repository.PaymentRepository()
        order_response = utils.create_order_api()
        repository.create_order(user_id, order_response["id"])
        return order_response
    except Exception as e:
        return e


def capture_order(order_id: str):
    """
    Capture an order on PayPal.
    """
    try:
        repository = payment_repository.PaymentRepository()
        capture_response = utils.capture_order_api(order_id)
        if capture_response["status"] == "COMPLETED":
            user_id = repository.get_by_order_id(order_id)
            if user_id:
                repository.create(capture_response, user_id)
                repository.update_payment(user_id, True)
            else:
                print("Order not found.")
        return capture_response
    except Exception as e:
        print("Error occurred:", e)
        return e
