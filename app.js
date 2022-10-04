const express = require('express');
const articleRouter = require('./routes/articleRoutes');
const projectRouter = require('./routes/projectRoute');
const errorHandler = require('./middlewares/errorHandler');
const newsletterRouter = require('./routes/newsletterRoute');

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// Routers
app.use('/api/v1/article', articleRouter); // Mounting the Router
app.use('/api/v1/project', projectRouter);
app.use('/api/v1/newsletter', newsletterRouter);

// Error Handler
app.use(errorHandler);

module.exports = app;
