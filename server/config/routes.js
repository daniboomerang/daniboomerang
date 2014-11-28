'use strict';

//var path = require('path');

module.exports = function(app) {
  app.get('/*', function(req, res) {
  	console.log("Serving index.html....");
    res.render('index.html');
  });
}  