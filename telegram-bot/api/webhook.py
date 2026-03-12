from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "8538289912:AAFbLSk_JkIN3wKZ3tk9PipzoB_sTPjXCvY")
TELEGRAM_API = f"https://api.telegram.org/bot{TOKEN}"


def send_message(chat_id, text):
    url = f"{TELEGRAM_API}/sendMessage"
    payload = {"chat_id": chat_id, "text": text}
    requests.post(url, json=payload)


def handle_update(update):
    message = update.get("message")
    if not message:
        return

    chat_id = message["chat"]["id"]
    text = message.get("text", "")
    first_name = message["from"].get("first_name", "")

    if text == "/start":
        reply = (
            f"សួស្តី {first_name}! ខ្ញុំជា Telegram Bot សាមញ្ញ។\n\n"
            "ពាក្យបញ្ជាដែលអាចប្រើ:\n"
            "/start - ចាប់ផ្តើម\n"
            "/help - ជំនួយ\n"
            "/about - អំពី Bot\n\n"
            "ឬ វាយអ្វីក៏បាន ខ្ញុំនឹង echo ត្រឡប់!"
        )
    elif text == "/help":
        reply = (
            "ពាក្យបញ្ជា:\n"
            "/start - ចាប់ផ្តើម\n"
            "/help - ជំនួយ\n"
            "/about - អំពី Bot\n\n"
            "ផ្ញើអ្វីក៏បាន ខ្ញុំ echo វាត្រឡប់!"
        )
    elif text == "/about":
        reply = "ខ្ញុំជា Bot សាមញ្ញដែលធ្វើដោយ Python + Flask ហើយ deploy នៅ Vercel។"
    else:
        reply = f"អ្នកនិយាយថា: {text}"

    send_message(chat_id, reply)


@app.route("/api/webhook", methods=["POST"])
def webhook():
    data = request.get_json()
    if data:
        handle_update(data)
    return jsonify({"ok": True})


@app.route("/", methods=["GET"])
def index():
    return jsonify({"status": "Bot is running!", "ok": True})


if __name__ == "__main__":
    app.run(debug=True)
