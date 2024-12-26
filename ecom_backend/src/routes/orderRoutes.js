const express = require('express');
const { createOrder } = require('../controllers/orderController');
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticateJWT, createOrder);

module.exports = router;