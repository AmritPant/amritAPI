const fs = require('fs');
const validator = require('validator');
const transporter = require('../utils/mailer');
const catchAsync = require('../utils/catchAsync');
const CustomError = require('../utils/CustomError');

exports.postMessage = catchAsync(async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return next(
      new CustomError(
        'Invalid Data | A message should contain, (Name, Email, and message)',
        400
      )
    );

  const isEmail = validator.isEmail(email);
  if (!isEmail) return next(new CustomError('Invalid Email Address', 400));

  if (name.length < 3)
    return next(new CustomError('Name Cannot be less than 3 letters', 400));

  if (message.length < 30)
    return next(new CustomError('Message Cannot be less than 30 letters', 400));

  let msg = '';

  fs.readFile(
    `${__dirname}/../docs/thanksForContacting.html`,
    'utf-8',
    (err, data) => {
      if (err) next(new CustomError('Unexpected Server Error', 500));
      msg = data.replace('{{NAME}}', name);
      transporter.sendMail({
        from: process.env.AUTH_GMAIL_ID,
        to: email,
        port: 465,
        secure: true,
        subject: 'Thank you for getting in touch | Amrit Pant',
        html: msg,
      });
    }
  );

  transporter.sendMail({
    from: process.env.AUTH_GMAIL_ID,
    to: process.env.RECEIVER_EMAIL_ID,
    port: 465,
    secure: true,
    subject: `New Message From ${name}`,
    text: `
    Name: ${name}
    Email: ${email}
    message: ${message}
    `,
  });

  res.send('<h1> hello </h1>');
});
