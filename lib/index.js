var decode = require('adobe-swatch-exchange').decode;
var _ = require('underscore');
var path = require('path')
var mustache = require('mustache');
var minimatch = require('minimatch');
var fs = require('fs');
var stylusTemplate = fs.readFileSync(path.join(__dirname, "..", "template", "variables.styl.template"), {encoding:'utf8'});


var rgbToHex = function(rgbFloat) {
  return pad(Math.round(rgbFloat * 255).toString(16));
};

var fromRGBGroup = function(rgbGroup){
  return "#" + rgbToHex(rgbGroup[0]) + rgbToHex(rgbGroup[1]) + rgbToHex(rgbGroup[2]);
};

var pad = function(str){
  if (str.length == 1){
    return "0" + str;
  }
  return str;
};

var render = function(aseFile, filterStrOrFcn){
  var decodedAse = decode(aseFile);
  var relevant = {
    colors: _(decodedAse.colors).filter(function(color){
      if (!filterStrOrFcn){
        return true;
      }
      if (_.isString(filterStrOrFcn)){
        return minimatch(color.name, filterStrOrFcn);
      }
      return filterStrOrFcn(color.name);
    }).map(function(color){
      return {
        name: color.name.replace(/ /g, "_"),
        color:  fromRGBGroup(color.color)
      };
    })
  };

  return mustache.render(stylusTemplate, relevant);
}
;

module.exports = {
  save: function(aseFile, stylusFile, filter){
    var renderedStylus = render(aseFile, filter);
    fs.writeFileSync(stylusFile, renderedStylus);
  },
  render: render
};
