from src.utils import payment as utils


def create_order():
    """
    Create an order on PayPal.
    """
    try:
        order_response = utils.create_order_api()
        return order_response
    except Exception as e:
        return e


def capture_order(order_id: str):
    """
    Capture an order on PayPal.
    """
    try:
        capture_response = utils.capture_order_api(order_id)
        return capture_response
    except Exception as e:
        return e
