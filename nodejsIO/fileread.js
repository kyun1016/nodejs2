//nodejs의 파일 시스템의 일부분을 활용해보았다.
//마치 include<filesystem>과 비슷하다고 생각된다.
//https://nodejs.org/dist/latest-v6.x/docs/api/fs.html#fs_fs_readfile_file_options_callback
var fs = require('fs');

//여기 보면 nodejsFileRead/sample로 해서 들어갔는데, 이는 처음 시작주소가 nodejs여서 이다.
//만일 시작 노드가 nodejsFileRead 였다면, 그냥 sample.txt로 해도 상관 없다.
fs.readFile('nodejsFileRead/sample.txt', 'utf-8',(err, data) =>{
  if (err) throw err;
  console.log(data);
});
