const express = require('express');
const projectController = require('../controllers/projectController');
const factory = require('../controllers/handleFactory');
const upload = require('../utils/multer');

const Router = express.Router();

Router.get('/', projectController.getAllProjects);
Router.get('/:id', projectController.getOneProject);

// Protected Routes
Router.post('/', factory.protect, projectController.createProject);
Router.patch('/:id', factory.protect, projectController.updateProject);
Router.delete('/:id', factory.protect, projectController.deleteProject);

Router.post(
  '/thumbnail/:id',
  factory.protect,
  upload.single('thumbnail'),
  projectController.updateThumbnail
);

module.exports = Router;
