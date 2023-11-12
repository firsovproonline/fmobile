const controller = require("../controllers/master");
module.exports = function(app) {
    app.get("/master", controller.list);
}
