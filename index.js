const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "deyaanoor9@gmail.com", // غيّر لبريدك
    pass: "mzfc rxnn zeez tmxr", // كلمة السر الخاصة للتطبيق (app password)
  },
});

app.post("/send-email", async (req, res) => {
  const { to, subject, html } = req.body;

  if (!to || !subject || !html) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await transporter.sendMail({
      from: "deyaanoor9@gmail.com", // نفس البريد المستخدم في auth
      to,
      subject,
      html,
    });
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email", error });
  }
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
