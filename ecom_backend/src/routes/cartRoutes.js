const express = require('express');
const { getCart, addToCart }  = require('../controllers/cartController');
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

router.get('./', authenticateJWT, getCart);
router.post('./', authenticateJWT, addToCart);

module.exports = router;