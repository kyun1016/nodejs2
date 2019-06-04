var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

router.get('/', function(req, res){
  console.log("hi");
  res.sendFile(path.join(__dirname, '../data/main.js'));
});

module.exports = router;
