const express = require('express');
const bookController = require('../controllers/bookController');
const factory = require('../controllers/handleFactory');
const upload = require('../utils/multer');

const Router = express.Router();

// Unproted Route
Router.get('/', bookController.getAllBooks);
Router.get('/:id', bookController.getOneBook);

// Protected Route
Router.patch('/:id', factory.protect, bookController.updateBook);
Router.delete('/:id', factory.protect, bookController.deleteBook);
Router.post('/', factory.protect, bookController.addNewBook);

Router.post(
  '/thumbnail/:id',
  factory.protect,
  upload.single('thumbnail'),
  bookController.updateThumbnail
);

module.exports = Router;
