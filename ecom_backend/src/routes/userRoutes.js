const express = require('express');
const { registerUser, loginUser, getProfile, updateProfile } = require('../controllers/userController');
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateJWT, getProfile);
router.put('/profile', authenticateJWT, updateProfile);
router.put('/profile', authenticateJWT, updateProfile);

module.exports = router;
