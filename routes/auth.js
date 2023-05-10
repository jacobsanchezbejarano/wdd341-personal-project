const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const routes = express.Router();
const path = require('path');
const axios = require('axios');

routes.get('/', (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
    );
  });
  
  

module.exports = routes;