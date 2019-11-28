    var express = require("express");
    var exphbs = require("express-handlebars");
    var mongoose = require("mongoose");

    var app = express();
    var PORT = process.env.PORT || 3000;

    //Middleware (express config)
    app.use(express.urlencoded({extended:true}))
    app.use(express.json());
    app.use(express.static("public")); //ssolo recibe path , no nombres de archivo

    //Handlebars (setting express with handlebars)
    app.engine("handlebars",
    exphbs({
        defaultLayout:"main"
    })
    );

    app.set("view engine", "handlebars");

    const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/eLibrary";
    mongoose.connect(MONGODB_URI);

    //Routes
    require("./routes/apiRoutes")(app);
    require("./routes/htmlRoutes")(app);

    //Start the server
    app.listen(PORT,function(){
        console.log("app running on port " + PORT + "!");
    });

