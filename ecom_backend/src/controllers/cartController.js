const Cart = require('../models/cartModel');

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');

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

const deleteFromCart = async (req, res) => {
    try {
        const { id } = req.params;

        const cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item._id.toString() === id);

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        cart.items.splice(itemIndex, 1);
        await cart.save();

        res.json({ message: 'Item removed from cart', cart });
    } catch (error) {
        console.error('Error deleting from cart:', error);
        res.status(500).json({ message: 'Error deleting from cart' });
    }
};

module.exports = { getCart, addToCart, deleteFromCart };