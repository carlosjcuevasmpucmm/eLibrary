const db = require("../models");

module.exports = function(app){ 
    app.get("/", function(req, res){ //agregar la ruta
        res.render("index")
    })
}