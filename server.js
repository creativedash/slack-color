
/**
 * Module dependencies
 */
var express     = require('express');
var parser      = require('body-parser');
var tinycolor   = require('tinycolor2');
// var Slack       = require('node-slack');
// var config      = require('./lib/config');
var utils       = require('./lib/utils');


/**
 * Express settings
 */
var app         = express();
var port        = process.env.PORT || 3000;
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());


/**
 * Routes
 */
app.post('/', function(req, res, next){
    var color = req.body.text ? req.body.text.split(" ")[0] : '000000';

    var triad = new tinycolor(color);
    triad = triad.triad().map(function(t){ return t.toHexString(); });
    var message = '';
    message += triad[0] + ' *' + utils.getColorName(triad[0]) + '*';
    // message += triad[1] + ' *' + utils.getColorName(triad[1]) + '*\n';
    // message += triad[2] + ' *' + utils.getColorName(triad[2]) + '*\n';

    return res.send(message);
});


/**
 * Start server
 */
app.listen(port, function(err){
    return console.log('Express running on port ' + port);
});
