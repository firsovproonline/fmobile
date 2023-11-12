const fs = require("fs");
exports.list = (req, res) => {
    const fileContent = fs.readFileSync(__dirname+'/dinamik/master/list.js', "utf8");
    eval(fileContent);
}