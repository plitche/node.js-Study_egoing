var fs = require('fs');

//readFileSync
console.log('A');
var result = fs.readFileSync('syntax/sample.txt', 'utf8');
console.log(result);
console.log('C');

console.log("==============================================")

//readFile
console.log('A');
fs.readFile('syntax/sample.txt', 'utf8', funtion(err, result) {
  console.log(result);
});
console.log('C');
