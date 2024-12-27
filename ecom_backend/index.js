const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const helmet = require('helmet');

// Import Routes
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const orderRoutes = require('./src/routes/orderRoutes');

// Load environment variables
dotenv.config();

// Initialize Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Initialize Express
const app = express();
app.use(express.json());

// Security Headers
app.use(helmet({
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            "style-src-elem": ["'self'", "https://fonts.googleapis.com"],
            "font-src": ["'self'", "https://fonts.gstatic.com"],
        },
    },
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Welcome to the E-Commerce API!');
});

// Server Initialization
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export Stripe for use in other modules
module.exports = stripe;
