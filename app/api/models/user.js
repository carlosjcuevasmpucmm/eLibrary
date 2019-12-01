const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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


module.exports = mongoose.model('UserModel', UserSchema);