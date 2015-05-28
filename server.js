
/**
 * Module dependencies
 */
var express     = require('express');
var tinycolor   = require('tinycolor2');
var Slack       = require('node-slack');
var config      = require('./lib/config');
var utils       = require('./lib/utils');


/**
 * Express settings
 */
var app         = express();;
var port        = process.env.PORT || 3000;


/**
 * Routes
 */
app.post('/', function(req, res, next){
    var color = req.query.color || '000000';
    var triad = new tinycolor(color);
    triad = triad.triad().map(function(t){ return t.toHexString(); });

    var message = triad[0] + ' *' + utils.getColorName(triad[0]) + '*\n';
    message += triad[1] + ' *' + utils.getColorName(triad[1]) + '*\n';
    message += triad[2] + ' *' + utils.getColorName(triad[2]) + '*\n';

    var slack = new Slack(config.slack.team, config.slack.token);
    slack.send({
        channel: "ui8-v4",
        text: message,
        username: "Bot",
        icon_emoji: ":art:"
    });

    return res.send(message);
});


/**
 * Start server
 */
app.listen(port, function(err){
    return console.log('Express running on port ' + port);
});
