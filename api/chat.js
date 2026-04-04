export default function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    return res.status(200).json({
      message: "وصلت رسالتك: " + message
    });
  }

  return res.status(405).json({
    message: "Method not allowed"
  });
}