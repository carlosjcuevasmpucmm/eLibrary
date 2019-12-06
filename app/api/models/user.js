const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Se usara para el hash de la clave de usuario
const saltRounds = 10;

//Modelado de la entidad user
const Schema = mongoose.Schema;

const UserSchema = new Schema({

 
 name: {
  type: String,
  trim: true,  
  required: true,
 },

 username: {
    type: String,
    trim: true,  
    required: true,
   },
 
 email: {
  type: String,
  trim: true,
  required: true
 },

 password: {
  type: String,
  trim: true,
  required: true
 },

 isAdmin: {
     type: Boolean
 } 

});

// hash para la password del usuario. 
UserSchema.pre('save', function(next){
this.password = bcrypt.hashSync(this.password, saltRounds);
next();
});
// This creates our model from the above schema, using mongoose's model method

var user = mongoose.model("UserModel", UserSchema);

// Export the Article model
module.exports = user;

// module.exports = mongoose.model('UserModel', UserSchema);