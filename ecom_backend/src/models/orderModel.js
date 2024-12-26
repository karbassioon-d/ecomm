const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
        }
    ],
    total: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);