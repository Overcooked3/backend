// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/jwtMiddleware');

// Routes pour les utilisateurs
router.post('/login', userController.login);
router.post('/register', userController.createUser);
router.put('/:id',userController.updateUser);
router.delete('/',userController.deleteUser);

module.exports = router;