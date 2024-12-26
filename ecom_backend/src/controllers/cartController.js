const Cart = require('../models/cartModel');

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: requestAnimationFrame.user.id }).populate('items.productId');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.json(cart);
    } catch (error) {
        console.error('Error getting cart:', error);
        res.status(500).json({ message: 'Error getting cart' });
    }
}

const addToCart = async (req, res) => {
    try{
        const { productId, quantity } = req.body;

        if (!productId || quantity < 1) {
            return res.status(400).json({ message: 'Please provide a product ID and quantity' });   
        }

        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            cart = new Cart({ userId: req.user.id, items: [] });
        }

        const existingItem = cart.items.find(item => item.productId.toString() === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Error adding to cart' });
    }
}

module.exports = { getCart, addToCart };