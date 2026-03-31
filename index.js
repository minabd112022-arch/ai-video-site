require('dotenv').config();

const express = require("express");
const path = require("path");
const { OpenAI } = require("openai");

const app = express();
// إعداد OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// إعدادات
app.use(express.json());
app.use(express.static(__dirname));

// الصفحة الرئيسية
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// صفحة الشات
app.get("/chat.html", (req, res) => {
  res.sendFile(path.join(__dirname, "chat.html"));
});

// الذكاء الاصطناعي
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: userMessage }
      ],
    });

    res.json({
      reply: response.choices[0].message.content,
    });
  } catch (error) {
    res.json({
      reply: "حدث خطأ 😢",
    });
  }
});

// تشغيل السيرفر
app.listen(3000, () => {
  console.log("Server running...");
});