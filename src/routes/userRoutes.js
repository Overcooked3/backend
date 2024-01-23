// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/jwtMiddleware');


// Routes pour les utilisateurs
router.post('/login', userController.login);
router.post('/register', userController.createUser);
router.put('/:id', [authenticateToken],userController.updateUser);
router.delete('/:id', [authenticateToken], userController.deleteUser);

router.get('/', [authenticateToken], userController.getAllUsers);

module.exports = router;