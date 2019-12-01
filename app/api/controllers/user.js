const userModel = require('../models/user');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

module.exports = {

    //Crear usuario
 create: function (req, res, next) {
  
  userModel.create ({ name: req.body.name, 
                    email: req.body.email, 
                    password: req.body.password,
                    order: req.body.order,
                    ordersPack: req.body.ordersPack
                }, function (err, result) {
      if (err) 
       next(err);
      else
       res.json({status: "success", message: "Se anadio el usuario", data:{user: result}});
      
    });
 },

 //Autenticar usuario asistido por JWS. La sesion dura 1h.
authenticate: function(req, res, next) {
  userModel.findOne({email:req.body.email}, function(err, userInfo){
     if (err) {
      next(err);
     } else {
if(bcrypt.compareSync(req.body.password, userInfo.password)) {
const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});
}else{
res.json({status:"error", message: "Invalid email/password!!!", data:null});
}
     }
    });
 },

}