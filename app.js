const helmet = require('helmet');
const express = require('express');
const rateLimiter = require('express-rate-limit');
const articleRouter = require('./routes/articleRoutes');
const projectRouter = require('./routes/projectRoute');
const errorHandler = require('./middlewares/errorHandler');
const newsletterRouter = require('./routes/newsletterRoute');
const contactUsRouter = require('./routes/contactUsRoute');

const app = express();

// Express Helmet for Secure Headers
app.use(helmet());

// rateLimiter for limiting the number of request
const limit = rateLimiter.rateLimit({
  windowMs: 15 * 60 * 1000, // 15minutes
  max: 100, // Per 15 minute 100max request
  message: `Too many request from this ip, Please try again a hour later`,
});
app.use('/api', limit);

// body-parser
app.use(express.json());

// Data sanitization against NoSQL query injection

// Request Logger
if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// Routers
app.use('/api/v1/article', articleRouter); // Mounting the Router
app.use('/api/v1/project', projectRouter);
app.use('/api/v1/newsletter', newsletterRouter);
app.use('/api/v1/contact', contactUsRouter);

// Error Handler
app.use(errorHandler);

module.exports = app;
