
module.exports = function(app){ 
    app.get("/", function(req, res){ //agregar la ruta
        res.render("index")
    })
    app.get("/upload", function(req, res){ //agregar la ruta
        res.render("bookUpload")
    })
    app.get("/modify", function(req, res){ //agregar la ruta
        res.render("bookModify")
    })
    app.get("/home", function(req, res){ //agregar la ruta
        res.render("homePage")
    })
}

