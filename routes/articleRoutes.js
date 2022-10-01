const express = require('express');
const articleController = require('../controllers/articleController');

const Router = express.Router();

Router.route('/')
  .get(articleController.getAllArticles)
  .post(articleController.addNewArticle);

module.exports = Router;
