const express = require('express');
const routes = express.Router();
const accountsFunctions = require('../controllers/accounts');
const { userValidationRules, validate } = require('../helpers/validator.js');

routes.get('/', accountsFunctions.getAll);
routes.get('/:id', accountsFunctions.getSingle);
routes.post('/',userValidationRules(), validate, accountsFunctions.post_account);
routes.put('/:id',userValidationRules(), validate, accountsFunctions.update_account);
routes.delete('/:id', accountsFunctions.delete_account);

module.exports = routes;