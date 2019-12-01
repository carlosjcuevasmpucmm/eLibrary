const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const OrderSchema = new Schema({

 
  Title: {
  type: String,
  required: true,
  },

  Author: {
    type: String,
    required:true,
  },

  text_id: {
    type: String,
    required: true
  },

  audio_id: {
    type: String,
    required: true
  },

  //Un arreglo de String, que de no recibir entrada correcta, efectivo por defecto
 payment: {
    type: String,
    enum: ['tarjeta','efectivo'],
    default: 'efectivo',
    required: true,
    trim: true
},

payed:{    
    type: Boolean,
    default: false,
    required: true
},

});

// Una orden solo tiene 1 usuario
OrderSchema.index({
  guid: 1,
},
{
unique:true
})

module.exports = mongoose.model('BookModel', OrderSchema)