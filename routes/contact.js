const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
require('dotenv').config();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const contact = new Contact({ name, email, message });
    await contact.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: email,
      to: process.env.RECEIVER_EMAIL,
      subject: 'From PortFolio You Received contact Request',
      text: `You received a new message from:
Name: ${name}
Email: ${email}
Message: ${message}`
    };
console.log('mailoptions',mailOptions);
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });

  } catch (error) {
  
    res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
});

module.exports = router;
