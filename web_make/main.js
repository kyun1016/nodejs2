var http = require('http');
var fs = require('fs');
//동적인 활용을 위한 선언
//참고, nodejs url parse query string
var url = require('url');

function templateHTML(title, list, body){
  return  `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    <a href="/create">create</a>
    ${body}
  </body>
  </html>
  `;
}

function templateList(fileList){
  var list = '<ul>';
  for(var i=0;i<fileList.length;i++){
    list = list + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
  }

  list = list + '</ul>';
  return list;
}


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
      fs.readdir('./data',(err, fileList)=>{
        //함수를 활용해 코드의 반복을 줄인다.
        var list = templateList(fileList);
        var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
        response.writeHead(200);
        response.end(template);
      });

    } else{
        fs.readFile(`data/${title}`, 'utf8', (err, description) => {
          //if(err) throw err;
          //템플릿을 활용해 문서를 처리하였다.
          fs.readdir('./data',(err, fileList)=>{
            var list = templateList(fileList);
            var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
            response.writeHead(200);
            response.end(template);
          });
        })
    }
  }
  else if(pathname === '/create'){
    title = 'WEB - create';
    fs.readdir('./data',(err, fileList)=>{
      //함수를 활용해 코드의 반복을 줄인다.
      var list = templateList(fileList);
      var template = templateHTML(title, list, `
        <form action="http://localhost:3000/create_process" method="post">
          <p><input type="text" name="title" placeholder ="title"></p>
          <p>
            <textarea name="description" rows="8" cols="80" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `);
      response.writeHead(200);
      response.end(template);
    });
  }
  else if(pathname === '/create_process'){
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
    });
    response.writeHead(200);
    response.end('success');
  }

  else {
      response.writeHead(404);
      response.end('Not found');
    }







});
app.listen(3000);
