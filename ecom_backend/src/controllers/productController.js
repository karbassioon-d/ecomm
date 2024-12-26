const Product = require('../models/productModel');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

res.json(products);
    }   catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
}

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;

        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        const product = new Product({ name, description, price, category, stock });

        const savedProduct = await product.save();

        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Error adding product' });
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);

    } catch (error) {
        console.error('Error getting product:', error);
        res.status(500).json({ message: 'Error getting product' });
    }
}

const updateProduct = async (req, res )=> {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
    
            product.name = req.body.name || product.name;
            product.description = req.body.description || product.description;
            product.price = req.body.price || product.price;
            product.category = req.body.category || product.category;
            product.stock = req.body.stock || product.stock;
    
            const updatedProduct = await product.save();
    
            res.json(updatedProduct);
            
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Error updating product' });
      }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found '});
        }

        res.json({ message: 'Product deleted successfully' });
    } catch {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Error deleting product' });
    }
}

module.exports = { getAllProducts, addProduct, getProductById, updateProduct, deleteProduct };