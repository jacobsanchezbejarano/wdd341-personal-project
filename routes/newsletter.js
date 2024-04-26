const express = require('express');
const routes = express.Router();
const newsletterFunctions = require('../controllers/newsletter');
const { isAuthenticated } = require("../helpers/authenticate");

routes.get('/', isAuthenticated, newsletterFunctions.getAll_newsletter);
routes.get('/:id', isAuthenticated, newsletterFunctions.getSingle_newsletter);
routes.post('/', newsletterFunctions.post_newsletter);
routes.delete('/:id', isAuthenticated, newsletterFunctions.delete_newsletter);

module.exports = routes;