const express = require('express');
const router = express.Router();
const bookController = require('../app/api/controllers/book');
const multer = require('multer');
const { memoryStorage } = require('multer');
const TTS = require('../app/AWS/TTS');
const userController = require('../app/api/controllers/user');





const m = multer({
    storage: memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024 
    }
  });

router.post('/',userController.userIsAdmin, m.single("file"),bookController.handleFileExtension,TTS.uploadText, TTS.uploadAudio, bookController.create);
router.delete('/:bookId', userController.userIsAdmin,bookController.deleteById);
router.put('/:bookId',userController.userIsAdmin, bookController.updateById);

router.get('/', bookController.getAll);
router.get('/:bookId', bookController.getById);
router.get('/read/:bookId', bookController.readBookId);
router.get('/listen/:bookId', bookController.listenBookId);

module.exports = router;