const express = require('express');
const routes = express.Router();
const cotizacionesFunctions = require('../controllers/email');
const { isAuthenticated } = require("../helpers/authenticate");

routes.post('/solicitar-cotizacion', cotizacionesFunctions.send_mail);

module.exports = routes;