export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer process.env.OPENAI_API_KEY"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "أنت مساعد ذكي يتكلم العربية بشكل بسيط" },
            { role: "user", content: message }
          ]
        })
      });

      const data = await response.json();

      return res.status(200).json({
        message: data.choices[0].message.content
      });

    } catch (error) {
      return res.status(500).json({
        message: "خطأ في الاتصال"
      });
    }
  }

  return res.status(405).json({
    message: "Method not allowed"
 }