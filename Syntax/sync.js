var fs = require('fs');

//readFileSync

// console.log('A');
// var result = fs.readFileSync('sample.txt', 'utf8');
// console.log(result);
// console.log('C');

console.log('A');
var result = fs.readFile('sample.txt', 'utf8', function(err, result){
  if(err) console.log('is err');
  console.log(result);
});
console.log('C');
