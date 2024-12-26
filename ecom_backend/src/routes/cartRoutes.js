const express = require('express');
const { getCart, addToCart, deleteFromCart }  = require('../controllers/cartController');
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateJWT, getCart);
router.post('/', authenticateJWT, addToCart);
router.delete('/:id', authenticateJWT, deleteFromCart);

module.exports = router;