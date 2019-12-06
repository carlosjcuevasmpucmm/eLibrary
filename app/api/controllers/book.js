
const BookModel = require('../models/book');
const UserModel = require('../models/user');


module.exports = {
    
    create: function(req, res, next) {
     BookModel.create(
                        {       title: req.body.title, 
                                author: req.body.author, 
                                text_id:req.body.text_id,
                                audio_id:req.body.audio_id
                        }, function (err, result) {
                            if (err) 
                             next(err);
                            else
                             res.json({status:"success", message: "titulo autor success", data:{book: result }});
                             
                            }
                        )

    },

    
    getAll: function(req, res, next) {
        let bookList = [];
      BookModel.find({}, function(err, book){
         if (err){
          next(err);
         } else{
          for (let or of book) {
           bookList.push({title: or.title, 
            author: or.author, 
            text_id: or.text_id,
            book_id: or.book_id,
            id: or._id
            });
          }
          res.json({status:"success", message: "Lista de libros!", data:{book: bookList}});
             
         }
      });
       },

       
       getById: function(req, res, next) {
        console.log(req.body);
        BookModel.findById(req.params.bookId, function(err, result){
         if (err) {
          next(err);
         } else {
          res.json({status:"success", message: "Libro  encontrado!", data:{book: result}});
         }
        });
       },

     //Eliminar un libro  
    deleteById: function(req, res, next) {
        BookModel.findByIdAndRemove(req.params.bookId, function(err, result){
         if(err)
          next(err);
         else {
          res.json({status:"success", message: "el libro fue borrado!", data:null});
         }
        });
    },

     
     updateById: function(req, res, next) {
        BookModel.findByIdAndUpdate(req.params.bookId,{
                                title: req.body.title, 
                                author: req.body.author, 
                                text_id:req.body.text_id,
                                audio_id:req.body.audio_id
        }, function(err, result){
      if(err)
          next(err);
         else {
          res.json({status:"success", message: "Libro actualizdo", data: {book: result}});
         }
        });
       },

      readBookId: function(req, res, next ){
        BookModel.findById(req.params.bookId, function(err, result){
          if (err) {
           next(err);
          } else {
           res.json({status:"success", message: "Libro  encontrado, a leer!", data:{text: result.text_id}});
          }
         });
      },

      listenBookId: function(req, res, next ){
        BookModel.findById(req.params.bookId, function(err, result){
          if (err) {
           next(err);
          } else {
           res.json({status:"success", message: "Libro  encontrado, a leer!", data:{text: result.audio_id}});
          }
         });
      }


      
}