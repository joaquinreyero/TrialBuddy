from fastapi import FastAPI

from src.endpoint import health, auth, payment
from src.config import configure_app

app = FastAPI()

configure_app(app)

app.include_router(health.router)
app.include_router(auth.router)
app.include_router(payment.router)
