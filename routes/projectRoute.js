const express = require('express');
const projectController = require('../controllers/projectController');

const Router = express.Router();

Router.route('/')
  .get(projectController.getAllProjects)
  .post(projectController.createProject);

Router.route('/:id')
  .get(projectController.getOneProject)
  .patch(projectController.updateProject)
  .delete(projectController.deleteProject);

module.exports = Router;
