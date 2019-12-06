const userModel = require('../models/user');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');




module.exports = {

    //Crear usuario
 create: function (req, res, next) {
  
  userModel.create ({ name: req.body.name, 
                     username: req.body.username, 
                     email: req.body.email,
                     password: req.body.password,
                     isAdmin: req.body.isAdmin
                }, function (err, result) {
      if (err) 
       next(err);
      else
       res.json({status: "success", message: "Se anadio el usuario", data:{user: result}});
      
    });
 },

 //Autenticar usuario asistido por JWS. La sesion dura 1h.
authenticate: function(req, res, next) {
  userModel.findOne({email:req.body.email}, function(err, userSchema){
     if (err) {
      next(err);
     } else {
        let payload = {id: userSchema._id, admin: userSchema.isAdmin};
        
if(bcrypt.compareSync(req.body.password, userSchema.password)) {
const token = jwt.sign( payload, req.app.get('secretKey'), { expiresIn: '1d' });
res.json({status:"success", message: "user found!!!", data:{user: userSchema, token:token}});
}else{
res.json({status:"error", message: "Invalid email/password!!!", data:null});
}
   }
    });

 },


 userIsAdmin: function(req, res, next){

   let token = req.headers['x-access-token'];

   if (token) {
    jwt.verify(token, req.app.get('secretKey'), (err, decoded) => {
      if (err) {
        res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else { 

         let payload = jwt.verify(token,req.app.get('secretKey'));

         if(payload.admin==true){

        req.decoded = decoded;
          
        next();
        
         }
         else{
            res.json({status:"error", message: "Do not have admin role", data:null});

         }
      }
    });
  } else {
     res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }

 }

}