const express = require('express');
const articleController = require('../controllers/articleController');
const factory = require('../controllers/handleFactory');
const upload = require('../utils/multer');

const Router = express.Router();

// Unprotected Route
Router.get('/', articleController.getAllArticles);
Router.get('/:id', articleController.getOneArticle);

// Protected Routes
Router.patch('/:id', factory.protect, articleController.updateArticle);
Router.delete('/:id', factory.protect, articleController.deleteArticle);
Router.post('/', factory.protect, articleController.addNewArticle);

Router.post(
  '/thumbnail/:id',
  factory.protect,
  upload.single('thumbnail'),
  articleController.updateThumbnail
);

module.exports = Router;
