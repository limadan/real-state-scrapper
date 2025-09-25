import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import os
from typing import List, Tuple, Optional

load_dotenv()

EMAIL_HOST: str = os.getenv("EMAIL_HOST")
EMAIL_PORT: int = int(os.getenv("EMAIL_PORT", 465))
EMAIL_USER: str = os.getenv("EMAIL_USER")
EMAIL_PASS: str = os.getenv("EMAIL_PASS")
EMAIL_FROM: str = os.getenv("EMAIL_FROM")


def generate_email_body(properties: List[Tuple]) -> str:
    if not properties:
        return ""

    # Email template with inline CSS for better styling
    html = """
    <!DOCTYPE html>
    <html lang="pt">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Novas Propriedades</title>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
            h2 { color: #333; text-align: center; margin-bottom: 20px; }
            .property-card { border: 1px solid #ddd; border-radius: 8px; margin-bottom: 20px; padding: 15px; background-color: #fafafa; display: flex; align-items: flex-start; }
            .property-image { width: 150px; height: 150px; object-fit: cover; border-radius: 4px; margin-right: 15px; flex-shrink: 0; }
            .property-content { flex: 1; }
            .property-title { font-size: 18px; font-weight: bold; color: #2c3e50; margin-bottom: 10px; }
            .property-details { font-size: 14px; color: #555; margin-bottom: 10px; }
            .property-link { display: inline-block; background-color: #3498db; color: #ffffff; padding: 10px 15px; text-decoration: none; border-radius: 4px; font-weight: bold; }
            .property-link:hover { background-color: #2980b9; }
            .footer { text-align: center; font-size: 12px; color: #777; margin-top: 20px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Últimas Propriedades Não Vistas</h2>
    """

    for prop in properties:
        prop_id, source_id, source_website, price, address, rooms, parking, photo, link = prop
        html += f"""
            <div class="property-card">
        """
        if photo:
            html += f'<img src="{photo}" alt="Imagem da Propriedade" class="property-image">'
        html += f"""
                <div class="property-content">
                    <div class="property-title">${price:,} - {address}</div>
                    <div class="property-details">
                        Quartos: {rooms or "N/A"} | Estacionamento: {parking or "N/A"}
                    </div>
                    <a href="{link}" class="property-link">Ver Anúncio</a>
                </div>
            </div>
        """

    html += """
            <div class="footer">
                Este email foi enviado pelo Serviço de Notificação do House Scrapper.
            </div>
        </div>
    </body>
    </html>
    """

    return html


def send_notification_email(to_emails: List[str], properties: List[Tuple]) -> None:
    if not properties:
        return

    msg = MIMEMultipart()
    msg['From'] = EMAIL_FROM
    msg['To'] = ', '.join(to_emails)
    msg['Subject'] = 'Novas Propriedades Encontradas - House Scrapper'

    body = generate_email_body(properties)
    msg.attach(MIMEText(body, 'html'))

    try:
        server = smtplib.SMTP_SSL(EMAIL_HOST, EMAIL_PORT)
        if EMAIL_PORT != 465:
            server.starttls()
        server.login(EMAIL_USER, EMAIL_PASS)
        text = msg.as_string()
        server.sendmail(EMAIL_FROM, to_emails, text)
        server.quit()
    except Exception as e:
        raise Exception(f"Failed to send email: {e}")
