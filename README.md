## ase2stylus

[![Build Status](https://travis-ci.org/erikzaadi/ase2stylus.svg)](https://travis-ci.org/erikzaadi/ase2stylus)

### Convert ase (Adobe Swatch Exchange) to stylus files with color variables

#### Installation

```bash
npm i [-g] ase2stylus
```

### Usage

#### CLI

```bash
ase2stylus --help

  Usage: ase2stylus [options]

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -i, --input [input]    path to ase file (defaults to stdin)
    -o, --output [output]  path to save rendered stylus (defaults to stout)
    -f, --filter [filter]  optional swatch name filter, E.g 'myPrefix*' (minimatch)
```

Will create the following stylus file:

```stylus
swatchName = #FA44AA
```

#### From source

```javascript
var ase2stylus = require('ase2stylus');
var fs = require('fs');

var aseFileContent = fs.readFileSync("/path/to/file.ase"); //notice not utf-8, raw

var renderedStylus = ase2stylus.render(aseFileContent);

//or save directly

ase2stylus.save(aseFileContent, "./path/to/target.styl");

//save and render optionally excepts a filter function for the swatch name
ase2stylus.render(aseFileContent, function(colorName){
  return colorName.indexOf("myPrefix") == 0;
});
```

### Methods

#### render(aseFileContent, optionalFilterStringOrFunction)

##### aseFileContent
ase file raw (not utf-8 string) content

##### optionalFilterStringOrFunction
either [minimatch](https://www.npmjs.org/package/minimatch) compatible string or a predicate function

E.g ```"myPrefix*"```

Or as a predicate function:

```javascript
function(colorName){
  //return true to include this in rendered stylus
  return colorName.startswith("myPrefix");
}
```

#### save(aseFileContent, stylusOutputPath, optionalFilterStringOrFunction)

##### aseFileContent

As in render method

##### stylusOutputPath

path to save rendered stylus

##### optionalFilterStringOrFunction

As in render method
