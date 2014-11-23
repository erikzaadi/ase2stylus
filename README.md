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

#### From source

```javascript
var ase2stylus = require('ase2stylus');

var renderedStylus = ase2stylus.render("./path/to/file.ase");

//or with buffer

var renderedStylus = ase2stylus.render(aseFileBuffer);

//or save directly

ase2stylus.save("./path/to/file.ase", "./path/to/target.styl");

//save and render optionally excepts a filter function for the swatch name
ase2stylus.render("./path/to/file.ase", function(colorName){
  return colorName.startsWith("myPrefix");
});
```
