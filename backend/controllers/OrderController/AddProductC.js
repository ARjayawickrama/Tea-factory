const Product = require('../../model/OrderModel/AddProductM');

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new product
exports.addProduct = async (req, res) => {
  try {
    const { productName, description, weights } = req.body; // Get weights from body
    const productImage = req.file ? req.file.filename : ''; // Only store the filename

    const newProduct = new Product({
      productName,
      description,
      weights: JSON.parse(weights), // Parse the weights JSON string
      productImage
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the existing product
    const existingProduct = await Product.findById(id);
    if (!existingProduct) return res.status(404).json({ message: 'Product not found' });

    // Update fields that are in the request body
    existingProduct.productName = req.body.productName || existingProduct.productName;
    existingProduct.description = req.body.description || existingProduct.description;
    existingProduct.weights = req.body.weights ? JSON.parse(req.body.weights) : existingProduct.weights; // Update weights

    // Only update the image if a new one is uploaded
    if (req.file) {
      existingProduct.productImage = req.file.filename; // Only store the filename
    }

    const updatedProduct = await existingProduct.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
  
// Delete product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};