const axios = require('axios');
const validator = require('validator');
const catchAsync = require('../utils/catchAsync');
const CustomError = require('../utils/CustomError');

exports.subscribe = catchAsync(async (req, res, next) => {
  const { email, first_name } = req.body;

  const isEmail = validator.isEmail(email);

  if (!email || !first_name)
    return next(
      new CustomError('Invalid Data | Please Provide both Name and Email', 400)
    );

  if (!isEmail)
    return next(
      new CustomError('Email is not valid! Please Provide Correct Email', 400)
    );

  if (first_name.trim().length < 3)
    return next(
      new CustomError(
        'Name not Valid | Name should be at least 3 character long ',
        400
      )
    );

  await axios.post(
    `${process.env.CONVERTKIT_URL}/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`,
    { email, first_name, api_key: process.env.CONVERTKIT_API_KEY }
  );

  res.status(201).json({
    status: 'sucess',
    data: 'Hurrah! You are subscribed | Please check your email for conformations ',
  });
});
