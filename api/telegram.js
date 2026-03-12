const TOKEN = process.env.TELEGRAM_BOT_TOKEN || "8538289912:AAFbLSk_JkIN3wKZ3tk9PipzoB_sTPjXCvY";
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

async function sendMessage(chatId, text) {
  await fetch(`${TELEGRAM_API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({ status: "Telegram Bot Webhook is running!" });
  }

  const update = req.body;
  const message = update?.message;

  if (!message) {
    return res.status(200).json({ ok: true });
  }

  const chatId = message.chat.id;
  const text = message.text || "";
  const firstName = message.from?.first_name || "អ្នក";

  if (text === "/start") {
    await sendMessage(
      chatId,
      `សួស្តី ${firstName}! ខ្ញុំជា Telegram Bot សាមញ្ញ។\n\n` +
      "ពាក្យបញ្ជាដែលអាចប្រើ:\n" +
      "/start - ចាប់ផ្តើម\n" +
      "/help - ជំនួយ\n" +
      "/about - អំពី Bot\n\n" +
      "ឬ វាយអ្វីក៏បាន ខ្ញុំនឹង echo ត្រឡប់!"
    );
  } else if (text === "/help") {
    await sendMessage(
      chatId,
      "ពាក្យបញ្ជា:\n" +
      "/start - ចាប់ផ្តើម\n" +
      "/help - ជំនួយ\n" +
      "/about - អំពី Bot\n\n" +
      "ផ្ញើអ្វីក៏បាន ខ្ញុំ echo វាត្រឡប់!"
    );
  } else if (text === "/about") {
    await sendMessage(
      chatId,
      "ខ្ញុំជា Bot សាមញ្ញដែល deploy នៅ Vercel ជាមួយ webhook!"
    );
  } else if (text) {
    await sendMessage(chatId, `អ្នកនិយាយថា: ${text}`);
  }

  return res.status(200).json({ ok: true });
}
