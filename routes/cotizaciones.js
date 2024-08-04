const express = require('express');
const routes = express.Router();
const cotizacionesFunctions = require('../controllers/cotizaciones');
const { isAuthenticated } = require("../helpers/authenticate");

// routes.get('/', isAuthenticated, cotizacionesFunctions.getAll_cotizaciones);
// routes.get('/:id', isAuthenticated, cotizacionesFunctions.getSingle_cotizaciones);
routes.post('/', cotizacionesFunctions.post_cotizaciones);
routes.post('/getcountry', cotizacionesFunctions.getCountryFromIp);
// routes.delete('/:id', isAuthenticated, cotizacionesFunctions.delete_cotizaciones);

module.exports = routes;