const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');

const createOrder = async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
  
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
      }
  
      const total = cart.items.reduce((sum, item) => {
        return sum + item.quantity * item.productId.price;
      }, 0);
  
  
      const order = new Order({
        userId: req.user.id,
        items: cart.items,
        total,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
      });
  
      await order.save();
  
      cart.items = [];
      await cart.save();
  
      res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Error creating order' });
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

const markOrderAsPaid = async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id);
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      order.isPaid = true;
      order.paidAt = Date.now();
  
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } catch (error) {
      console.error('Error marking order as paid:', error);
      res.status(500).json({ error: 'Error marking order as paid' });
    }
  };
  
  module.exports = { createOrder, getUserOrders, markOrderAsPaid };
  