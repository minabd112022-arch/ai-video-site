export default function handler(req, res) {

  if (req.method === "GET") {
    return res.status(200).json({ reply: "API شغال ✅" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method Not Allowed" });
  }

  try {
    const { message } = req.body || {};

    return res.status(200).json({
      reply: "🤖 رد تجريبي: " + (message || "فارغ")
    });

  } catch (error) {
return res.status(500).json({
      reply: "❌ حدث خطأ"
    });
  }
}