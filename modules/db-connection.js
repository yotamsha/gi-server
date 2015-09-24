var mongoose = require('mongoose');
var config = require('../config');
var mongoDBConnection = mongoose.createConnection(config.mongodb.host, config.mongodb.dbName);

module.exports = mongoDBConnection;