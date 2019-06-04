module.exports = {
  HTML:function(title, list, body, control){
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
      ${control}
      ${body}
    </body>
    </html>
    `;
  },

  list:function(fileList){
    var list = '<ul>';
    for(var i=0;i<fileList.length;i++){
      list = list + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
    }

    list = list + '</ul>';
    return list;
  },

  JSONList:function(jsonContent){
    var list = '<ul>';
    for(var i=0;i<Object.keys(jsonContent.person).length;i++){
      // var string = JSON.stringify(jsonContent.person[i]);
      console.log(jsonContent.person[i].owner);
      list = list + `<li><a href="/">${jsonContent.person[i].owner}</a></li>`;
    }
    list = list + '</ul>';
    return list;
  },

}
