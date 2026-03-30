require('dotenv').config();

const express = require('express');
const path = require('path');
const { OpenAI } = require('openai');

const app = express();

// 🔑 ضع المفتاح هنا 👇
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());
app.use(express.static(__dirname));

// 🔥 هذا هو الذكاء الاصطناعي
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "user", content: userMessage }
    ]
  });

  res.json({
    reply: response.choices[0].message.content
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});