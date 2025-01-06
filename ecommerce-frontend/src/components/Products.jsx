import React from 'react'
import { generateProducts } from '../utils/generateProducts';
import { motion } from 'framer-motion';

const products = generateProducts(20);

const Products = () => {
  return (
    <div className="my-9">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-blue-500 font-bold mt-2">${product.price.toFixed(2)}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Products;