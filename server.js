
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
    var name = utils.getColorName(color);

    var triad = new tinycolor(color);
    triad = triad.triad().map(function(t){ return t.toHexString(); });

    var message = '<div style="display:inline-block;height:20px;width:20px;background:'+triad[0]+'"></div>';
    message += ' <span style="line-height:20px">';
    message += name + '</span>';
    message += "<div></div>";
    message += '<div style="display:inline-block;height:20px;width:20px;background:'+triad[0]+'"></div>';
    message += '<div style="display:inline-block;height:20px;width:20px;background:'+triad[1]+'"></div>';
    message += '<div style="display:inline-block;height:20px;width:20px;background:'+triad[2]+'"></div>';

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
