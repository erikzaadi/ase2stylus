## ase2stylus

### Convert ase (Adobe Swatch Exchange) to stylus files with color variables

#### Installation

```bash
npm i [-g] ase2stylus
```

### Usage

#### CLI

```bash
ase2stylus ./path/to/file.ase
#or
ase2stylus ./path/to/file.ase --filter=prefix\* #any glob compatible string
#also works with stdin
cat ./path/to/file.ase | ase2stylus
```

Will create the following stylus file:

```stylus
swatchName = #FA44AA
```

#### From source

```javascript
var ase2stylus = require('ase2stylus');

var renderedStylus = ase2stylus.render("./path/to/file.ase");

//or save directly

ase2stylus.save("./path/to/file.ase", "./path/to/target.styl");

//save and render optionally excepts a filter function for the swatch name
ase2stylus.render("./path/to/file.ase", function(colorName){
  return colorName.startsWith("myPrefix");
});
```

### Methods

#### render(asePathOrBuffer, optionalFilterStringOrFunction)

##### asePathOrBuffer
string path or buffer to ase file

##### optionalFilterStringOrFunction
either [minimatch](https://www.npmjs.org/package/minimatch) compatible string or a predicate function

E.g

```"myPrefix*"```

Or

```javascript
function(colorName){
  //return true to include this in rendered stylus
  return colorName.startswith("myPrefix");
}
```

#### save(asePathOrBuffer, stylusOutputPath, optionalFilterStringOrFunction)

##### asePathOrBuffer

As in render method

##### stylusOutputPath

path to save rendered stylus

##### optionalFilterStringOrFunction

As in render method
