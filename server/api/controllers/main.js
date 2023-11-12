const fs = require("fs");
exports.progress = (req, res) => {
    const fileContent = fs.readFileSync(__dirname+'/dinamik/main.js', "utf8");
    eval(fileContent);
}