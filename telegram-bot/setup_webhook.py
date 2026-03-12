"""
Run this script ONCE after deploying to Vercel to connect Telegram to your bot.
Usage: python3 telegram-bot/setup_webhook.py https://your-project.vercel.app
"""

import sys
import requests

TOKEN = "8538289912:AAFbLSk_JkIN3wKZ3tk9PipzoB_sTPjXCvY"
TELEGRAM_API = f"https://api.telegram.org/bot{TOKEN}"


def set_webhook(vercel_url):
    webhook_url = f"{vercel_url.rstrip('/')}/api/telegram"
    response = requests.post(
        f"{TELEGRAM_API}/setWebhook",
        json={"url": webhook_url}
    )
    result = response.json()
    if result.get("ok"):
        print(f"Webhook set successfully!")
        print(f"URL: {webhook_url}")
    else:
        print(f"Failed: {result}")


def get_webhook_info():
    response = requests.get(f"{TELEGRAM_API}/getWebhookInfo")
    print(response.json())


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 telegram-bot/setup_webhook.py https://your-project.vercel.app")
        print("\nCurrent webhook info:")
        get_webhook_info()
    else:
        set_webhook(sys.argv[1])
