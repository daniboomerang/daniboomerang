'use strict';
/* Load .env */
var dotenv = require('dotenv');
dotenv.load();
/*************/

// Module dependencies.
var express = require('express'),
    // FROM Express 4.x middlewares are external dependencies.
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    //-- //
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    errorHandler = require('express-error-handler'),
    mongoStore = require('connect-mongo')(session),
    config = require('./server/config/config');

var app = express();
module.exports = app;

// Connect to database
var db = require('./server/db/mongo').db;

// Bootstrap models
var modelsPath = path.join(__dirname, 'server/models');
fs.readdirSync(modelsPath).forEach(function (file) {
    require(modelsPath + '/' + file);
});

// configuration ===============================================================

if ('development' == config.env) {
  app.use(express.static(path.join(__dirname, 'client')));
  app.use(errorHandler());
  app.set('views', __dirname + '/client');
  app.use(morgan('dev')); // log every request to the console
}

else if ('production' == config.env) {
  app.use(express.static(path.join(__dirname, 'client')));
  app.use(errorHandler());
  app.set('views', __dirname + '/client');
  app.use(morgan('prod')); // log every request to the console
};

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// cookieParser should be above session
app.use(cookieParser())

// bodyParser should be above methodOverride
app.use(bodyParser());
app.use(methodOverride());

// express/mongo session storage
app.use(session({
  secret: 'MEAN',
  store: new mongoStore({
    db: db.connection.db,
    //collection: 'sessions'
  })
}));

//routes should be at the last
//app.use(app.router);

//Bootstrap routes
require('./server/config/routes')(app);

// Start server
var port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});

if (process.platform !== 'win32') {
  //
  // Signal handlers don't work on Windows.
  //
  process.on('SIGINT', function () {
    console.log('http-server stopped.');
    process.exit();
  });
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
String.prototype.contains = function(it) { return this.indexOf(it) != -1; };
