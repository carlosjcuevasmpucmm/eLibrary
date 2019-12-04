const express = require('express');
const router = express.Router();
const bookController = require('../app/api/controllers/book');
const multer = require('multer');
const { memoryStorage } = require('multer');
const TTS = require('../app/AWS/TTS', '../app/AWS/awscreds.json');





const m = multer({
    storage: memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024 
    }
  });

router.post('/', bookController.create, m.single("file"),TTS.uploadAudio);
router.get('/', bookController.getAll);
router.get('/:bookId', bookController.getById);
router.delete('/:bookId', bookController.deleteById);
router.put('/:bookId', bookController.updateById);



module.exports = router;