var http = require('http');
var fs = require('fs');
var url = require('url');
var template = require('./lib/template.js');

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



  if(pathname === '/')
  {
    if(title == undefined){
      title = 'Welcome';
      var description = 'Hello, Node.js';
      var contents = fs.readFileSync("data.json");
      var jsonContent = JSON.parse(contents);
      console.log(jsonContent);
      console.log(jsonContent.phoneNumber);
      //var list = template.list(jsonContent.person);
      //var html = template.HTML(title, list, `<h2>${title}</h2>${description}`, `<a href="/post">post</a>`);
      //response.writeHead(200);
      //response.end(html);
      fs.readdir('./data',(err, fileList)=>{
        //함수를 활용해 코드의 반복을 줄인다.
        var list = template.list(fileList);
        var html = template.HTML(title, list, `<h2>${title}</h2>${description}`, `<a href="/post">post</a>`);
        response.writeHead(200);
        response.end(html);
      });

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
        if (err) throw err;
        // response.writeHead(200);
        // response.end(`save to ${title}`);
        response.writeHead(302, {Location: `/?id=${title}`});
        response.end();
      });
    });
  }
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
          if (err) throw err;
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
        if(err) throw err;
        response.writeHead(302, {Location: `/?id=${id}`});
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
