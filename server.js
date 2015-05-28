
/**
 * Module dependencies
 */
var express     = require('express');
var parser      = require('body-parser');
var tinycolor   = require('tinycolor2');
var Slack       = require('node-slack');
var config      = require('./lib/config');
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

    // var color = '#4F9689';

    var triad = new tinycolor(color);
    triad = triad.triad().map(function(t){ return t.toHexString(); });
    var message = '';
    // var message = '&lt;div class="inline_color_block" style="background:'+triad[0]+'"&gt;&lt;/div&gt; ';
    message += triad[0] + ' *' + utils.getColorName(triad[0]) + '*\n';
    // message += '&lt;div class="inline_color_block" style="background:'+triad[1]+'"&gt;&lt;/div&gt; ';
    message += triad[1] + ' *' + utils.getColorName(triad[1]) + '*\n';
    // message += '&lt;div class="inline_color_block" style="background:'+triad[2]+'"&gt;&lt;/div&gt; ';
    message += triad[2] + ' *' + utils.getColorName(triad[2]) + '*\n';

    // var slack = new Slack(config.slack.domain, config.slack.token);
    // slack.send({
    //     icon: ":art:",
    //     text: utils.getColorName(triad[0]),
    //     channel: "ui8-v4",
    //     username: "Colorbox",
    //     attachments: [
    //         { color: triad[0], text: utils.getColorName(triad[0])  },
    //         { color: triad[1], text: utils.getColorName(triad[1])  },
    //         { color: triad[2], text: utils.getColorName(triad[2])  }
    //     ]
    // }, function(err){
    //     console.log(err)
    // });

    return res.send(message);
});


/**
 * Start server
 */
app.listen(port, function(err){
    return console.log('Express running on port ' + port);
});
