from src.config import Settings

import httpx
import base64


def generate_access_token():
    if not Settings().PAYPAL_CLIENT_ID or not Settings().PAYPAL_CLIENT_SECRET:
        raise Exception("PayPal client ID or client secret not found.")
    credentials = f"{Settings().PAYPAL_CLIENT_ID}:{Settings().PAYPAL_CLIENT_SECRET}"
    auth = base64.b64encode(credentials.encode()).decode()
    response = httpx.post(
        f"{Settings().PAYPAL_BASE_URL}/v1/oauth2/token",
        data={'grant_type': 'client_credentials'},
        headers={'Authorization': f'Basic {auth}'}
    )
    data = response.json()

    return data["access_token"]


def create_order_api():
    access_token = generate_access_token()
    url = f"{Settings().PAYPAL_BASE_URL}/v2/checkout/orders"
    payload = {
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "amount": {
                    "currency_code": "USD",
                    "value": "29.99"}
            }
        ]
    }
    with httpx.Client() as client:
        response = client.post(
            url,
            json=payload,
            headers={"Content-Type": "application/json", "Authorization": f"Bearer {access_token}"},
        )

    response.raise_for_status()
    return response.json()


def capture_order_api(order_id: str):
    access_token = generate_access_token()
    url = f"{Settings().PAYPAL_BASE_URL}/v2/checkout/orders/{order_id}/capture"
    with httpx.Client() as client:
        response = client.post(
            url,
            headers={"Content-Type": "application/json", "Authorization": f"Bearer {access_token}"},
        )

    return response.json()
