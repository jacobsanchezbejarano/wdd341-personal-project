const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongodb = require('./db/connect');
const port = process.env.PORT || 3030;
const hostname = '127.0.0.1';

app.use(bodyParser.json()).use('/', require('./routes'))
  .use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Z-Key');
  res.setHeader('Content-Type','application/json');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
  });

process.on('uncaughtException',(err,origin) =>{
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, ()=>{
      console.log(`Server running at http://${hostname}:${port}/`);
      console.log(`DB connected`);
    });
  }
});