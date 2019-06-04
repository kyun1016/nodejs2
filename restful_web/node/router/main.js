var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

router.get('/', function(req, res){
  console.log("hi");
  res.sendFile(path.join(__dirname, '../data/form.html'));
});

router.post('/email_post', function(req,res){
  //get : req.param('email')
  console.log(req.body);
  //res.send("welcome! " + req.body.email);
  //출력을 할때 값을 조정해야 할 필요가 있을때, 이런식으로 전송한다.
  res.render('email.ejs', {'email' : req.body.email});
});

module.exports = router;
