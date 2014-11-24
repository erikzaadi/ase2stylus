var chai = require('chai');
var expect = chai.expect;
var ase2stylus = require('../index');
var path = require('path');
var fs = require('fs');
var testAsePath = path.join(__dirname, "test.ase");
var testAseContent = fs.readFileSync(testAsePath);

describe('The awesome ase2stylus module', function(){
  it('should return the correct amount of styles', function(){
    var expected = "myPrefixBlue = #336699\n\
someGreen = #33ef30\n\
Red_With_Spaces = #f2362c\n\
myPrefixYellow = #fff775\n\
Badass = #bada55\n"
    expect(ase2stylus.render(testAseContent)).to.be.equal(expected);
  });
  it('should be able to filter according to prefixes string', function(){
    var expected = "myPrefixBlue = #336699\n\
myPrefixYellow = #fff775\n";
    expect(ase2stylus.render(testAseContent, "myPrefix*")).to.be.equal(expected);
 });
  it('should be able to filter according to predicate', function(){
    var expected = "myPrefixBlue = #336699\n\
myPrefixYellow = #fff775\n";
    expect(ase2stylus.render(testAseContent, function(colorName){
      return colorName.indexOf("myPrefix") == 0;
    })).to.be.equal(expected);
 });
});
