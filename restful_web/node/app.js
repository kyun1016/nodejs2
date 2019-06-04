
var express = require('express');
var app = express();
app.listen(3000, function(){
  console.log("this line will be at the end");
});

//get방식의 요청을 처리한다.
app.get('/', function(req,res){
  res.send("<h1>안녕하세요</h1>");
  console.log(__dirname);
  res.sendFile( __dirname + '/data/main.html');
});

app.use(express.static('data'));

//bodyParser을 이용해 post요청을 처리한다.
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.post('/email_post', function(req,res){
  console.log(req.body)
  res.send("welcome! " + req.body.email)
})


const http = require('http');
const https = require('https');


//put요청을 처리해주자.(update)









/**
 * getJSON:  RESTful GET request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */

module.exports.getJSON = (options, onResult) => {
  console.log('rest::getJSON');
  const port = options.port == 443 ? https : http;

  let output = '';

  const req = port.request(options, (res) => {
    console.log(`${options.host} : ${res.statusCode}`);
    res.setEncoding('utf8');

    res.on('data', (chunk) => {
      output += chunk;
    });

    res.on('end', () => {
      let obj = JSON.parse(output);

      onResult(res.statusCode, obj);
    });
  });

  req.on('error', (err) => {
    // res.send('error: ' + err.message);
  });

  req.end();
};





//
// //get방식의 호출
// const xhr = new XMLHttpRequest();
// xhr.open('GET', 'http://localhost:5000/todos');
// xhr.send();
//
// xhr.onreadystatechange = function (e) {
//   if (xhr.readyState !== XMLHttpRequest.DONE) return;
//
//   if(xhr.status === 200) { // 200: OK => https://httpstatuses.com
//     console.log(xhr.responseText);
//   } else {
//     console.log("Error!");
//   }
//
// };
//
//
// //특정 부분 get호출
// const xhr = new XMLHttpRequest();
// xhr.open('GET', 'http://localhost:5000/todos/1');
// xhr.send();
//
// xhr.onreadystatechange = function (e) {
//   if (xhr.readyState !== XMLHttpRequest.DONE) return;
//
//   if(xhr.status === 200) {
//     console.log(xhr.responseText);
//   } else {
//     console.log("Error!");
//   }
// };
//
//
// //post방식
// const xhr = new XMLHttpRequest();
// xhr.open('POST', 'http://localhost:5000/todos');
// xhr.setRequestHeader('Content-type', 'application/json');
// xhr.send(JSON.stringify({ id: 4, content: 'Angular', completed: true }));
//
// xhr.onreadystatechange = function (e) {
//   if (xhr.readyState !== XMLHttpRequest.DONE) return;
//
//   if(xhr.status === 201) { // 201: Created
//     console.log(xhr.responseText);
//   } else {
//     console.log("Error!");
//   }
// };
//
//
//
// //put방식
// const xhr = new XMLHttpRequest();
// xhr.open('PUT', 'http://localhost:5000/todos/4');
// xhr.setRequestHeader('Content-type', 'application/json');
// xhr.send(JSON.stringify({ id: 4, content: 'React', completed: false }));
//
// xhr.onreadystatechange = function (e) {
//   if (xhr.readyState !== XMLHttpRequest.DONE) return;
//
//   if(xhr.status === 200) {
//     console.log(xhr.responseText);
//   } else {
//     console.log("Error!");
//   }
// };
//
//
// //patch방식
// const xhr = new XMLHttpRequest();
// xhr.open('PATCH', 'http://localhost:5000/todos/4');
// xhr.setRequestHeader('Content-type', 'application/json');
// xhr.send(JSON.stringify({ completed: true }));
//
// xhr.onreadystatechange = function (e) {
//   if (xhr.readyState !== XMLHttpRequest.DONE) return;
//
//   if(xhr.status === 200) {
//     console.log(xhr.responseText);
//   } else {
//     console.log("Error!");
//   }
// };
//
// //delete
// const xhr = new XMLHttpRequest();
// xhr.open('DELETE', 'http://localhost:5000/todos/4');
// xhr.send();
//
// xhr.onreadystatechange = function (e) {
//   if (xhr.readyState !== XMLHttpRequest.DONE) return;
//
//   if(xhr.status === 200) {
//     console.log(xhr.responseText);
//   } else {
//     console.log("Error!");
//   }
// };
