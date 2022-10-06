const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  auth: {
    user: process.env.AUTH_GMAIL_ID,
    pass: process.env.AUTH_GMAIL_PASSWORD,
  },
});

module.exports = transporter;
