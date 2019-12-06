const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const OrderSchema = new Schema({

 
  title: {
  type: String,
  required: true,
  },

  author: {
    type: String,
    required:true,
  },
  year: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  text_id: {
    type: String,
    required: true
  },

  audio_id: {
    type: String,
    required: true
  },
});


module.exports = mongoose.model('BookModel', OrderSchema)