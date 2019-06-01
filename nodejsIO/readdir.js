const testFolder = './web1_html_internet-master/data';
const fs = require('fs');

fs.readdir(testFolder, (err, fileList) => {
  console.log(fileList);
});
