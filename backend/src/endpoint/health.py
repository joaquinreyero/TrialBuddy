from fastapi import Depends, status, APIRouter

router = APIRouter(
    prefix="/api",
    tags=['Health Check']
)


@router.get("/health", status_code=status.HTTP_200_OK)
async def health_check():
    """
    Verify the health of services.
    """
    return {"status": "ok"}


