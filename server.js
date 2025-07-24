require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5500;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

 const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
   to: process.env.EMAIL_USER,
    subject: `Yangi xabar: ${name}`,
    text: `Yuboruvchi: ${name}\nEmail: ${email}\n\nXabar:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email yuborildi");
    res.status(200).json({ success: true, message: 'Xabar yuborildi!' });
  } catch (error) {
    console.error("❌ Email yuborishda xatolik:", error);
    res.status(500).json({ success: false, message: 'Xatolik yuz berdi!' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT}-portda ishlayapti`);
});