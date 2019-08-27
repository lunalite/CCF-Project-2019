var express = require('express'),
  app = express(),
  port = process.env.PORT || 9000,
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/routes.js'); //importing route
routes(app); //register the route

app.listen(port);

console.log('Started CCF TTT APP on ' + port);
