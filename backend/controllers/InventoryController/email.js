const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service
  auth: {
    user: 'sadeepmalaka2@gmail.com',
    pass: 'bfxr wzmt jalb grxp'
  }
});

app.post('/send-email', (req, res) => {
  const { email, subject, body } = req.body;

  const mailOptions = {
    from: 'sadeepmalaka2@gmail.com',
    to: email,
    subject: subject,
    text: body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
      return res.status(500).send('Failed to send email');
    }
    console.log('Email sent:', info.response);
    res.send('Email sent successfully');
  });
});
