var http = require('http');
var fs = require('fs');
var url = require('url');
var template = require('./lib/template.js');


//나의 목표 : https://poiemaweb.com/js-rest-api

var app = http.createServer(function(request,response){
  var _url = request.url;
  //동적인 접근을 하도록 설정해준다.
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  //가독성을 높이기 위해서 title로 묶어주었다.
  var title = queryData.id;
  var qs = require('querystring');
  console.log(queryData.id);
  console.log(url.parse(_url, true));
  var description = 'Hello, Node.js';
  var contents = fs.readFileSync("./data/data.json");
  var jsonContent = JSON.parse(contents);
  console.log(jsonContent.person[0].owner);
  console.log(jsonContent.person[0]);
  console.log(Object.keys(jsonContent.person).length);

  //처음 메인화면
  if(pathname === '/')
  {
    if(title == undefined){
      title = 'Welcome';

      // var list = template.JSONList(jsonContent.person);

      var list = '<ol>';
      for(var i=0;i<Object.keys(jsonContent.person).length;i++){
        // var string = JSON.stringify(jsonContent.person[i]);
        console.log(jsonContent.person[i].owner);
        list = list + `<li><a href="/?id=${i+1}">${jsonContent.person[i].owner}</a></li>`;
      }
      list = list + '</ol>';

      var html = template.HTML(title, list, `<h2>${title}</h2>${description}`, `<a href="/post">post</a>`);
      response.writeHead(200);
      response.end(html);



      // //data폴더의 항목을 읽어 목록으로 만든다.(default)
      // fs.readdir('./data',(err, fileList)=>{
      //   //함수를 활용해 코드의 반복을 줄인다.
      //   var list = template.list(fileList);
      //   var html = template.HTML(title, list, `<h2>${title}</h2>${description}`, `<a href="/post">post</a>`);
      //   response.writeHead(200);
      //   response.end(html);
      // });

    }
    else{
        fs.readFile(`data/${title}`, 'utf8', (err, description) => {
          //if(err) throw err;
          //템플릿을 활용해 문서를 처리하였다.
          fs.readdir('./data',(err, fileList)=>{
            var list = template.list(fileList);
            var html = template.HTML(title, list, `<h2>${title}</h2>${description}`,`<a href="/post">post</a>
            <a href="/update?id=${title}">update</a>
            <form action="/delete_process" method="post">
              <input type="hidden" name="id" value=${title}>
              <input type="submit">
            </form>
            `);
            response.writeHead(200);
            response.end(html);
          });
        })
    }
  }
  //post방식 구현
  else if(pathname === '/post'){
    var title = 'WEB - post';
    fs.readdir('./data',(err, fileList)=>{
      //함수를 활용해 코드의 반복을 줄인다.
      var list = template.list(fileList);
      var html = template.HTML(title, list, `
        <form action="/post_process" method="post">
          <p><input type="text" name="title" placeholder ="title"></p>
          <p>
            <textarea name="description" rows="8" cols="80" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `,' ');
      response.writeHead(200);
      response.end(html);
    });
  }
  else if(pathname === '/post_process'){
    var body = '';
    request.on('data', function(data){
      body += data;
    });

    //데이터량이 너무 많으면 통신 차단(보안)
    // if(body.length > 1e6){
    //   request.connection.destroy();
    // }
    request.on('end', function(){
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      console.log(post);
      console.log(post.title);
      console.log(post.description);

      fs.writeFile(`./data/${title}`, description, 'utf8', (err) => {
        response.writeHead(302, {Location: `/?id=${title}`});
        response.end();
      });
    });
  }
  //update를 구현하자.
  else if(pathname === '/update'){
    fs.readFile(`data/${title}`, 'utf8', (err, description) => {
      //if(err) throw err;
      //템플릿을 활용해 문서를 처리하였다.
      fs.readdir('./data',(err, fileList)=>{
        var list = template.list(fileList);
        var html = template.HTML(title, list, `<form action="/update_process" method="post">
        <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder ="title" value="${title}"></p>
          <p>
            <textarea name="description" rows="8" cols="80" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>`, ' ');
        response.writeHead(200);
        response.end(html);
      });
    })
  }
  else if(pathname === '/update_process'){
    var body = '';
    request.on('data', function(data){
      body += data;
    });
    request.on('end', function(){
      var post = qs.parse(body);
      var title = post.title;
      var id = post.id;
      var description = post.description;
      console.log(post);
      console.log(post.title);
      console.log(post.id);
      console.log(post.description);

      fs.rename(`./data/${id}`, `./data/${title}`, (err) => {
        fs.writeFile(`./data/${title}`, description, 'utf8', (err) => {
          response.writeHead(302, {Location: `/?id=${title}`});
          response.end();
        });
      });
    });
  }
  else if(pathname === '/delete_process'){
    var body = '';
    request.on('data', function(data){
      body += data;
    });
    request.on('end', function(){
      var post = qs.parse(body);
      var id = post.id;
      fs.unlink(`./data/${id}`, (err) => {
        response.writeHead(302, {Location: `/`});
        response.end();
      });
    });
  }
  else {
      response.writeHead(404);
      response.end('Not found');
    }







});
app.listen(3000);
