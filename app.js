const hpp = require('hpp');
const cors = require('cors');
const path = require('path');
const xss = require('xss-clean');
const helmet = require('helmet');
const express = require('express');
const bookRouter = require('./routes/bookRoute');
const rateLimiter = require('express-rate-limit');
const projectRouter = require('./routes/projectRoute');
const mongoSanitize = require('express-mongo-sanitize');
const articleRouter = require('./routes/articleRoutes');
const contactUsRouter = require('./routes/contactUsRoute');
const errorHandler = require('./middlewares/errorHandler');
const newsletterRouter = require('./routes/newsletterRoute');

const app = express();

// Setting up Cross origin resource sharing
app.use(cors());

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

// Request Logger
if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// Serving Static Files
app.use('/static', express.static(path.join(__dirname, 'public')));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Preventing From Parameter Pollution
app.use(hpp({ whitelist: [] }));

// Routers
app.use('/api/v1/article', articleRouter); // Mounting the Router
app.use('/api/v1/project', projectRouter);
app.use('/api/v1/newsletter', newsletterRouter);
app.use('/api/v1/contact', contactUsRouter);
app.use('/api/v1/book', bookRouter);

// Error Handler
app.use(errorHandler);

module.exports = app;
