const user = require("../app/api/models/user");
module.exports = function(app){ 
    app.get("/test", function(req, res){ //agregar la ruta
        console.log("hey");
    })

    app.post("/register", function(req, res){
 
    })
}