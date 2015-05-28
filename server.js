
/**
 * Module dependencies
 */
var express     = require('express');
var color       = require('tinycolor2');
var slack       = require('node-slack');
var config      = require('./config');


/**
 * Express settings
 */
var app         = express();;
var port        = process.env.PORT || 3000;


/**
 * Routes
 */
app.get('/', function(req, res, next){
    return res.send('working');
});


/**
 * Start server
 */
app.listen(port, function(err){
    return console.log('Express running on port ' + port);
});
