
    var express = require("express");
    const exphbs = require("express-handlebars");
    var app = express();
    var logger = require("morgan");
    var bodyParser = require("body-parser");
    var PORT = process.env.PORT || 3000;
    const mongoose = require("mongoose");
    const jwt = require("jsonwebtoken");
    
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

    app.set('secretKey', 'nodeRestApi'); 


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

    //Validar ADMIN, PUEDE QUE NO SE IMPLEMENTE ASI. iNVESTIGANDO
    // function validateAdmin(req, res, next) {
    //   jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    //     if (err) {
    //       res.json({status:"error", message: err.message, data:null});
    //     }else{
    //       // Anade el id de usuario a los request, dando pase a rutas protegidas
    //       if (req.body.isAdmin == true){
    //       req.body.userId = decoded.id;
    //       next();
    //       }
    //       else{
    //         res.json({status:"error", message:"You are not admin"});
    //       }
    //     }
    //   });
      
    //   }
    // //Rutas admin
    //  app.use('/bookAdm', validateAdmin, bookAdm);
  
    require("./routes/htmlRoutes")(app);

    const user = require("./routes/user");
    //Rutas publicas
    app.use('/user', user);

    const book = require("./routes/book");
    //Rutas user
    // app.use('/book', validateUser, book);
    app.use('/book', book);

    const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlinesFinal";

    mongoose.connect(MONGODB_URI);
    

//     // express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// // handle 404 error
// app.use(function(req, res, next) {
//   let err = new Error('Not Found');
//      err.status = 404;
//      next(err);
//  });
 // handle errors
 app.use(function(err, req, res, next) {
  console.log(err);
  
   if(err.status === 404)
    res.status(404).json({message: "Not found"});
   else 
     res.status(500).json({message: "Something looks wrong :( !!!"});
 });
        
    //Start the server
    app.listen(PORT,function(){ 
        console.log("app running on port " + PORT + "!");
    });

