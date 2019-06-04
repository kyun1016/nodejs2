
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var main = require('./router/main') ;
// var mysql = require('mysql')
//
// // DATABASE SETTING
// var connection = mysql.createConnection({
// 	host : 'localhost',
// 	port : 3306,
// 	user : 'root',
// 	password : 'asdf1234',
// 	database : 'jsman'
// })

// connection.connect()


app.listen(3000, function(){
  console.log("this line will be at the end");
});


//get방식의 요청을 처리한다.
//data폴더 내의 정적인 파일들을 불러올 수 있도록 설정
app.use(express.static('data'));
//json형태의 입력을 받는다.
app.use(bodyParser.json())
//타입이 정해지지 않은 입력을 받는다.
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs');

app.use('/main', main);

//url routing
app.get('/', function(req,res){
  res.sendFile( __dirname + '/data/form.html');
});

// app.get('/main', function(req,res){
//   res.sendFile( __dirname + '/data/main.html');
// });


app.use('/main', main);

app.post('/user_post', function(req,res){
  //get : req.param('email')
  console.log(req.body);
  //res.send("welcome! " + req.body.email);
  //출력을 할때 값을 조정해야 할 필요가 있을때, 이런식으로 전송한다.
  res.render('email.ejs', {'phoneNumber' : req.body.phoneNumber});
});

app.post('/ajax_send_user', function(req, res){
  console.log(req.body);
  var responseData = {'resule' : 'ok', 'owner' : req.body.phoneNumber};
  res.json(responseData);
});


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
