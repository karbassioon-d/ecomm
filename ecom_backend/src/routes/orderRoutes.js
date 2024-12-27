const express = require('express');
const { 
    createOrder, 
    getUserOrders, 
    markOrderAsPaid,
} = require('../controllers/orderController');
const authenticateJWT = require('../middleware/authMiddleware');
const stripe = require('../index');

const router = express.Router();

router.post('/', authenticateJWT, createOrder);
router.get('/user', authenticateJWT, getUserOrders);
router.put('/:id/pay', authenticateJWT, markOrderAsPaid);

//stripe payment
router.post('/:id/pay', authenticateJWT, async (req, res) => {
    try {
        const { id } = req.params;
        const { paymentMethodId } = req.body;

        const order = await OrderedBulkOperation.findById(id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(order.total * 100),
            currency : 'usd',
            payment_method: paymentMethodId,
            confirm: true,
        });

        order.isPaid = true;
        order.paidAt = Date.now();
        await order.save();

        res.status(200).json({ message: 'Payment successful', paymentIntent });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ message: 'Payment failed' });
    }
})

module.exports = router;