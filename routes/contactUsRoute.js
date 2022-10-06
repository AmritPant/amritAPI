const express = require('express');
const contactController = require('../controllers/contactUsController');

const Router = express.Router();

Router.post('/', contactController.postMessage);

module.exports = Router;
