const express = require('express');
const routes = express.Router();
const cotizacionesFunctions = require('../controllers/cotizaciones');
const { isAuthenticated } = require("../helpers/authenticate");

// routes.get('/', isAuthenticated, cotizacionesFunctions.getAll_cotizaciones);
// routes.get('/:id', isAuthenticated, cotizacionesFunctions.getSingle_cotizaciones);
routes.get('/getcountry/:id', cotizacionesFunctions.getCountryFromIp);
routes.get('/gettext/:id/:lang', cotizacionesFunctions.getTextsAndPricesEndpoint);
routes.post('/', cotizacionesFunctions.post_cotizaciones);
// routes.delete('/:id', isAuthenticated, cotizacionesFunctions.delete_cotizaciones);

module.exports = routes;