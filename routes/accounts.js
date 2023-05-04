const express = require('express');
const routes = express.Router();
const accountsFunctions = require('../controllers/accounts');

routes.get('/', accountsFunctions.getAll);
routes.get('/:id', accountsFunctions.getSingle);
routes.post('/', accountsFunctions.post_account);
// routes.put('/:id', accountsFunctions.update_account);
// routes.delete('/:id', accountsFunctions.delete_account);

module.exports = routes;