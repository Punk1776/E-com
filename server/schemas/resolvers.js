const { Product } = require('../models');

const resolvers = {
  Query: {
    products: async () => {
      return await Product.find({}); // Retrieve all products
    },
    productById: async (_, { productId }) => {
      return await Product.findById(productId); // Retrieve product by ID
    }
  },
  Mutation: {
    addProduct: async (_, { name, description, price, category, size, color, imageUrls }) => {
      const newProduct = new Product({
        name,
        description,
        price,
        category,
        size,
        color,
        imageUrls
        // Add more fields as needed
      });
      return await newProduct.save(); // Save the new product
    },
    updateProduct: async (_, { productId, ...updates }) => {
      return await Product.findByIdAndUpdate(productId, updates, { new: true }); // Update product by ID
    },
    deleteProduct: async (_, { productId }) => {
      return await Product.findByIdAndDelete(productId); // Delete product by ID
    }
  }
};

module.exports = resolvers;
