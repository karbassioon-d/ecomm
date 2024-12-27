const express = require('express');
const { createOrder, getUserOrders } = require('../controllers/orderController');
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticateJWT, createOrder);
router.get('/user', authenticateJWT, getUserOrders);

module.exports = router;