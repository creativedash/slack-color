
/**
 * Module dependencies
 */
var tinycolor   = require('tinycolor2');
var colors      = require('./color_names');


/**
 * Get Name of Color from Color Code
 * @param  {String} color HEX, RGB, HSL, etc...
 * @return {String}
 */
exports.getColorName = function(color){
    // Convert Color to RGBa
    var my_color = toRgbArray(color);

    // Find closest color
    var min = 3 * Math.pow(256, 2) + 1;
    var data = null;
    for(var key in colors){
        var compare_color = toRgbArray(key);
        var diff = rgbDistance(compare_color, my_color);
        if (diff < min) {
            min = diff;
            data = colors[key];
        }
    }

    // Return the color
    return data; // ex. "Athens Gray"
};



/**
 * Helper to convert TinyColor RGBa object to RGB array
 * @param  {String} color
 * @return {Array} 
 */
function toRgbArray(color){
    // Convert Color to RGBa
    var rgba = new tinycolor(color).toRgb();

    // Convert RGB object to array
    var rgb = Object.keys(rgba).map(function (key) {return rgba[key]});
    rgb.pop(); // remove alpha value

    return rgb;
};


/**
 * Helper to determine distance between two colors
 * @param  {Array} c1 Color as RGB array
 * @param  {Array} c2 Color as RGB array
 * @return {Number}
 */
function rgbDistance(c1, c2) {
    return Math.pow(c1[0] - c2[0], 2) + Math.pow(c1[1] - c2[1], 2) + Math.pow(c1[2] - c2[2], 2);
}