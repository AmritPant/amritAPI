const express = require('express');
const articleController = require('../controllers/articleController');

const Router = express.Router();

Router.route('/')
  .get(articleController.getAllArticles)
  .post(articleController.addNewArticle);

Router.route('/:id')
  .get(articleController.getOneArticle)
  .patch(articleController.updateArticle)
  .delete(articleController.deleteArticle);

module.exports = Router;
