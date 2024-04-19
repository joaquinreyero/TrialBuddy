from fastapi import Depends, status, APIRouter

router = APIRouter(
    prefix="/api/v1/payment",
    tags=['Payment']
)


@router.post("/orders")
async def create_order(cart: dict):
    """
    Create an order on paypal.
    """
    print(idea)
    return {"status": "ok"}
