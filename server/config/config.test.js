var config = require('./config.dev');
 
config.env = 'test';
config.mongo.db = 'mongodb://localhost/daniboomerang_test';
 
module.exports = config;