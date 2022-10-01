const express = require('express');
const articleRouter = require('./routes/articleRoutes');

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// Routers
app.use('/api/v1/article', articleRouter);

module.exports = app;
