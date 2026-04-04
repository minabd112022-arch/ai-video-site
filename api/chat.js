export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  const { message } = req.body;

  // رد مؤقت
  let reply = "";

  if (message.includes("اهلا")) {
    reply = "مرحبا بك 👋 كيف أستطيع مساعدتك؟";
  } else if (message.includes("كيف")) {
    reply = "أنا بخير 😊 ماذا تريد أن تعرف؟";
  } else {
    reply = "وصلتني رسالتك: " + message;
  }

res.status(200).json({ reply });
}