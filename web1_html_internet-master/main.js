var http = require('http');
var fs = require('fs');
//동적인 활용을 위한 선언
//참고, nodejs url parse query string
var url = require('url');


var app = http.createServer(function(request,response){
    var _url = request.url;
    //동적인 접근을 하도록 설정해준다.
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    //가독성을 높이기 위해서 title로 묶어주었다.
    var title = queryData.id;


    console.log(queryData.id);
    console.log(url.parse(_url, true));



    if(pathname === '/')
    {
      if(title == undefined){
        title = 'Welcome';
        var description = 'Hello, Node.js';
        fs.readdir('./data',(err, fileList)=>{
          console.log(fileList);

          var list = '<ul>';
          for(var i=0;i<fileList.length;i++){
            list = list + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
          }

          list = list + '</ul>';

          var template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
          `;
          response.writeHead(200);
          response.end(template);
        });

    } else
      {
        fs.readFile(`data/${title}`, 'utf8', (err, description) => {
            //if(err) throw err;
            //템플릿을 활용해 문서를 처리하였다.
            fs.readdir('./data',(err, fileList)=>{
              console.log(fileList);

              var list = '<ul>';
              for(var i=0;i<fileList.length;i++){
                list = list + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
              }

              list = list + '</ul>';

              var template = `
              <!doctype html>
              <html>
              <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
              </head>
              <body>
                <h1><a href="/">WEB</a></h1>
                ${list}
                <h2>${title}</h2>
                <p>${description}</p>
              </body>
              </html>
              `;
              response.writeHead(200);
              response.end(template);
            });
      })
    }
  } else {
      response.writeHead(404);
      response.end('Not found');
    }







});
app.listen(3000);
