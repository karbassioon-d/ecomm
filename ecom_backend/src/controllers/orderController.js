const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');

const createOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const total = cart.items.reduce((sum, item) => sum + item.quantity * item.productId.price, 0);

        const oder = new Order({
            userId: req.user.id,
            items: cart.items,
            total,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating order' });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });

        if (!orders.length) {
            return res.status(404).json({ message: 'No orders found' });
        }

        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting orders' });
    }
};

module.exports = { createOrder, getUserOrders };