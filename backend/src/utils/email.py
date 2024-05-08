from fastapi_mail import FastMail, MessageSchema, MessageType
from datetime import datetime

from src import config


async def send_confirmation_email(data):
    try:
        current_date = datetime.now()

        days_remaining = (data["expiry_date"] - current_date).days
        html = f"""
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                }}
                .container {{
                    width: 80%;
                    margin: auto;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                }}
                .message {{
                    color: #333;
                    font-size: 16px;
                    line-height: 1.5;
                }}
                .additional-info {{
                    color: #666;
                    font-size: 14px;
                    line-height: 1.2;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <p class="message">Your trial for {data["trial"]} will expire in {days_remaining} days, on {data["expiry_date"].strftime('%Y-%m-%d %H:%M')}</p>
                <p class="additional-info">Additional information:</p>
                <ul class="additional-info">
        """

        if data["url"]:
            html += f"<li><a href='{data['url']}'>Link to trial</a></li>"

        if data["message"]:
            html += f"<li>{data['message']}</li>"

        html += """
                </ul>
            </div>
        </body>
        </html>
        """

        message = MessageSchema(
            subject="Trial Expiration Notification",
            recipients=[data["email"]],
            body=html,
            subtype=MessageType.html
        )

        fm = FastMail(config.configure_mail())
        await fm.send_message(message)
    except Exception as e:
        raise e


