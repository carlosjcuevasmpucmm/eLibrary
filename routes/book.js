const express = require('express');
const router = express.Router();
const bookController = require('../app/api/controllers/book');


router.post('/', bookController.create);
router.get('/', bookController.getAll);
router.get('/:bookId', bookController.getById);
router.delete('/:bookId', bookController.deleteById);
router.put('/:bookId', bookController.updateById);



module.exports = router;