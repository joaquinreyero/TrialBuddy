from fastapi import Depends, status, APIRouter, Request

from src.service import payment

router = APIRouter(
    prefix="/api/v1/payment",
    tags=['Payment']
)


@router.post("/orders")
def create_order(user_id: int):
    """
    Create an order on PayPal.
    """
    return payment.create_order(user_id)


@router.post("/orders/{order_id}/capture")
def capture_order(order_id: str):
    """
    Capture an order on PayPal.
    """
    return payment.capture_order(order_id)
