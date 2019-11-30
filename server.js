
    var express = require("express");
    const mongoose = require('./config/database'); //database configuration   
    
    var app = express();
    var PORT = process.env.PORT || 3000;

    const logger = require('morgan');
    const bodyParser = require('body-parser');
    var jwt = require('jsonwebtoken');

    var exphbs = require("express-handlebars");

    

    // conexion a mongodb desde inicio del servidor
    mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:')); 

    //Rutas
    const user = require('./routes/user');


    //Middleware (express config)
    app.use(express.urlencoded({extended:true}))
    app.use(express.json());
    app.use(express.static("public")); //ssolo recibe path , no nombres de archivo
    

    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({extended: false}));



    //Handlebars (setting express with handlebars)
    app.engine("handlebars",
    exphbs({
        defaultLayout:"main"
    })
    );

    app.set("view engine", "handlebars");


    //Validar un usuario
    function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
      if (err) {
        res.json({status:"error", message: err.message, data:null});
      }else{
        // Anade el id de usuario a los request, dando pase a rutas protegidas
        req.body.userId = decoded.id;
        next();
      }
    });
    
    }
  
    require("./routes/apiRoutes")(app);
    require("./routes/htmlRoutes")(app);

    
    // //Routes - sin autenticacacion 
    app.use('/user', user);
    //Start the server
    app.listen(PORT,function(){ 
        console.log("app running on port " + PORT + "!");
    });

