const express = require('express');
const helmet = require('helmet');
const articleRouter = require('./routes/articleRoutes');
const projectRouter = require('./routes/projectRoute');
const errorHandler = require('./middlewares/errorHandler');
const newsletterRouter = require('./routes/newsletterRoute');
const contactUsRouter = require('./routes/contactUsRoute');

const app = express();

// Express Helmet for Secure Headers
app.use(helmet());

// body-parser
app.use(express.json());

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
