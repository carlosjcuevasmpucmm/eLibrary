
// Para el manejo de las rutas y los controladores con los metodos
const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/user');

// //Rutas de manejo de usuario
router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);
module.exports = router;