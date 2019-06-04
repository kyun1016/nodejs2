var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

router.get('/', function(req, res){
  console.log("hi");
  res.sendFile(path.join(__dirname, '../data/form.html'));
});

// router.get('/get', function(req,res){
//   res.sendFile( __dirname + '/data/data.json');
// });
//
// router.post('/user_post', function(req,res){
//   //get : req.param('email')
//   console.log(req.body);
//   //res.send("welcome! " + req.body.email);
//   //출력을 할때 값을 조정해야 할 필요가 있을때, 이런식으로 전송한다.
//   //뷰 엔진 활용
//   res.render('email.ejs', {'phoneNumber' : req.body.phoneNumber});
// });
//
// router.post('/ajax_send_user', function(req, res){
//   console.log(req.body);
//   var responseData = {
//     'resule' : 'ok',
//     'phoneNumber' : req.body.phoneNumber,
//     'owner' : req.body.owner,
//     'corporation' : req.body.corporation
//   };
//   res.json(responseData);
// });

module.exports = router;
