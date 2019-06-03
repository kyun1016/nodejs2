// Read Synchrously
var fs = require("fs");
console.log("\n *START* \n");
var fs = require("fs");
console.log("\n *STARTING* \n");
// Get content from file
var contents = fs.readFileSync("schema.json");
// Define to JSON type
var jsonContent = JSON.parse(contents);
// Get Value from JSON
console.log("User Name:", jsonContent.username);
console.log("Email:", jsonContent.email);
console.log("Password:", jsonContent.password);
console.log("\n *EXIT* \n");
