var number = [1,400,12,34,5];
var count=0;
for(var i=0;i<number.length;i++){
  count = number[i] + count;
  console.log(number[i]);
}
console.log(count);
console.log(`total : ${count}`);
