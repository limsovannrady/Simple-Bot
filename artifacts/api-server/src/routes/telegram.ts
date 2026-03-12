import { Router, type IRouter, type Request, type Response } from "express";

const router: IRouter = Router();

const TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? "8538289912:AAFbLSk_JkIN3wKZ3tk9PipzoB_sTPjXCvY";
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

async function sendMessage(chatId: number, text: string): Promise<void> {
  await fetch(`${TELEGRAM_API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

router.post("/telegram", async (req: Request, res: Response) => {
  const update = req.body;

  const message = update?.message;
  if (!message) {
    res.json({ ok: true });
    return;
  }

  const chatId: number = message.chat.id;
  const text: string = message.text ?? "";
  const firstName: string = message.from?.first_name ?? "អ្នក";

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
      "ខ្ញុំជា Bot សាមញ្ញដែលធ្វើដោយ Node.js + Express ហើយ host នៅ Replit ជាមួយ webhook!"
    );
  } else if (text) {
    await sendMessage(chatId, `អ្នកនិយាយថា: ${text}`);
  }

  res.json({ ok: true });
});

export default router;
