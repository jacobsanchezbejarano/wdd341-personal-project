
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
const express = require('express');
const routes = express.Router();
const functions = require('../controllers/');

routes.use('/accounts', require('./accounts'));
routes.use('/', require('./swagger'));
routes.get('/', functions.get_name);
routes.use('/auth', require('./auth'));
routes.use('/oauth-callback', require('./oauth-callback'));




module.exports = routes;