const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const express = require('express');
const routes = express.Router();
const path = require('path');

routes.get('/', ({ query: { code } }, res) => {
    const body = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_SECRET,
      code,
    };
    const opts = { headers: { accept: 'application/json' } };
    axios
      .post('https://github.com/login/oauth/access_token', body, opts)
      .then((_res) => _res.data.access_token)
      .then((token) => {
        // eslint-disable-next-line no-console
        console.log('My token:', token);
  
        res.redirect(`/?token=${token}`);
      })
      .catch((err) => res.status(500).json({ err: err.message }));
  });

module.exports = routes;