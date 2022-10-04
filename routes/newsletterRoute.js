const express = require('express');
const emailController = require('../controllers/newsletterController');

const Router = express.Router();

Router.route('/subscribe').post(emailController.subscribe);

module.exports = Router;
