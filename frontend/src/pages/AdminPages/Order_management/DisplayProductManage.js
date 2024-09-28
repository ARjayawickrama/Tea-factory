import React, { useState, useEffect } from 'react';
import { FaBox, FaList, FaEdit, FaTrash, } from 'react-icons/fa';
import axios from 'axios';

// Modal Component for Adding Product
function AddProductModal({ show, onClose, onProductAdded, productToEdit, onProductUpdated  }) {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [weights, setWeights] = useState([
      { weight: '100g', price: '' },
      { weight: '250g', price: '' },
      { weight: '500g', price: '' },
      { weight: '1kg', price: '' },
    ]);
    const [productImage, setProductImage] = useState(null);
  
    // Handle the image file change
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setProductImage(file);
      }
    };
    
  
    // Populate form fields when editing
    useEffect(() => {
      if (productToEdit) {
        setProductName(productToEdit.productName);
        setDescription(productToEdit.description);
        setWeights(productToEdit.weights || [
          { weight: '100g', price: '' },
          { weight: '250g', price: '' },
          { weight: '500g', price: '' },
          { weight: '1kg', price: '' },
        ]);
        setProductImage(productToEdit.productImage || null); // Reset image since it won't be updated automatically
      }
    }, [productToEdit]);
   
    // Handle weight and price input changes
    const handleWeightPriceChange = (index, field, value) => {
      const updatedWeights = [...weights];
      updatedWeights[index][field] = value;
      setWeights(updatedWeights);
    };
  
    // Add a new weight-price pair dynamically
    const addWeightPrice = () => {
      setWeights([...weights, { weight: '', price: '' }]);
    };
  
    // Remove a weight-price pair
    const removeWeightPrice = (index) => {
      const updatedWeights = weights.filter((_, i) => i !== index);
      setWeights(updatedWeights);
    };
  
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent form from reloading the page
  
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('description', description);
      formData.append('weights', JSON.stringify(weights));
      // Only append productImage if a new one is uploaded
    if (productImage && productImage !== productToEdit?.productImage) {
      formData.append('productImage', productImage);
    }
  
     
      try {
        let response;
        if (productToEdit) {
          // If editing, send PUT request
          response = await axios.put(`http://localhost:5004/DisplayProduct/${productToEdit._id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          onProductUpdated(response.data); // Notify parent component about the updated product
        } else {
          // If adding new product
          response = await axios.post('http://localhost:5004/DisplayProduct', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          onProductAdded(response.data); // Notify parent component about the new product
        }
        onClose(); // Close modal after successful submission
      } catch (error) {
        console.error('Error adding product:', error);
      }
    };
  
    if (!show) return null;
  
    return (
      
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-full max-w-lg p-6 bg-white rounded shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">{productToEdit ? 'Edit Product' : 'Add Product'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-semibold" htmlFor="productName">Product Name</label>
              <input
                id="productName"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter product name"
                required // Ensure this field is required
              />
            </div>
  
            <div className="mb-4">
              <label className="block mb-1 text-sm font-semibold" htmlFor="productDescription">Description</label>
              <textarea
                id="productDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter product description"
                required
              />
            </div>
  
             {/* Dynamic Weight and Price Inputs */}
            {weights.map((weightItem, index) => (
              <div key={index} className="flex mb-4 space-x-2">
                <input
                  type="text"
                  value={weightItem.weight}
                  onChange={(e) => handleWeightPriceChange(index, 'weight', e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Weight (e.g., 100g)"
                  required
                  readOnly={['100g', '250g', '500g', '1kg'].includes(weightItem.weight)}  // Disable editing predefined weights
                />
                <input
                  type="number"
                  value={weightItem.price}
                  onChange={(e) => handleWeightPriceChange(index, 'price', e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Price (Rs)"
                  required
                />
                <button type="button" onClick={() => removeWeightPrice(index)} className="text-red-600">Remove</button>
              </div>
            ))}
            <button type="button" onClick={addWeightPrice} className="px-4 py-2 mb-4 text-white bg-blue-600 rounded">Add Weight-Price</button>
  
  
            <div className="mb-4">
              <label className="block mb-1 text-sm font-semibold" htmlFor="productImage">Product Image</label>
              <input
                id="productImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border rounded"
              />
              {productToEdit && !productImage && productToEdit.productImage && (
                <div className="mt-2">
                  <p>Current image:</p>
                  <img
                    src={`http://localhost:5004/images/${productToEdit.productImage}`}
                    alt={productToEdit.productName}
                    className="object-cover w-32 h-32 mt-2"
                  />
                </div>
              )}
            </div>
  
            <div className="flex justify-end space-x-4">
              <button type="button" onClick={onClose} className="px-4 py-2 text-white bg-red-600 rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 text-white bg-green-600 rounded">{productToEdit ? 'Update Product' : 'Add Product'}</button>
            </div>
          </form>
        </div>
      </div>
    );}



 
  export default function Order() {
    const [isSidebarOpen] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [productToEdit, setProductToEdit] = useState(null);

    // Fetch products when component loads
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get('http://localhost:5004/DisplayProduct');
          const productsWithDefaults = response.data.map(product => ({
            ...product,
            weights: product.weights || [] // Ensure weights is always an array
          }));
          setProducts(productsWithDefaults);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
    
      fetchProducts();
    }, []);
    
  
  
  
  
    // Handle adding product
    const handleProductAdded = (newProduct) => {
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    };
  
    // Handle updating product
    const handleProductUpdated = (updatedProduct) => {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        )
      );
    };
  
    // Handle edit click
    const handleEditClick = (product) => {
      setProductToEdit(product); // Set the product to edit
      setIsModalOpen(true);      // Open the modal
    };
  
  
  
     // Handle delete click
     const handleDeleteClick = async (productId) => {
      try {
        await axios.delete(`http://localhost:5004/DisplayProduct/${productId}`);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    };
  
      
  
    
  
    return (
      <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}>
        <nav>
          <ul>
            <li className="flex items-center p-4 cursor-pointer bg-amber-500 mt-9">
              <FaBox className="w-8 h-8 mr-4" />
              <span className="text-lg font-semibold">Order</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <main className={`flex-1 p-6 transition-transform duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
  
      <div className="container p-4 mx-auto">
  <h1 className="text-3xl font-bold">Product List</h1>

  {/* Add some space (e.g., margin-top of 4 units) between the button and the table */}
  <button 
    onClick={() => setIsModalOpen(true)} 
    className="px-4 py-2 mt-4 text-white bg-green-600 rounded-lg"
  >
    Add Product
  </button>

  <div className="mt-6 Product_list"> {/* Add margin-top here if needed */}
    <table className="w-full bg-white border-collapse rounded-lg shadow-lg">
      <thead>
        <tr className="w-2 font-extrabold text-white bg-green-800">
          <th className="w-1 p-2 text-center border border-b">Product Name</th>
          <th className="w-1 p-2 text-center border border-b">Product Image</th>
          <th className="w-1 p-2 text-center border border-b">Description</th>
          <th className="w-1 px-4 py-3 text-center border">Weights & Prices</th>
          <th className="w-1 p-2 text-center border border-b">Action</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(products) && products.map((product) => (
          <tr key={product._id}>
            <td className="p-2 border border-b">{product.productName}</td>
            <td className="p-2 border border-b">
              <img 
                src={`http://localhost:5004/images/${product.productImage.split('/').pop()}`} 
                alt={product.productName} 
                className="object-cover w-16 h-16"
              />
            </td>
            <td className="p-2 border border-b">{product.description}</td>
            <td className="px-4 py-3 border">
              {product.weights.map((wp, index) => (
                <div key={index}>
                  <span>{wp.weight} - Rs.{wp.price}</span>
                </div>
              ))}
            </td>
            <td className="p-2 space-x-6 border">
              <button 
                className="text-yellow-600 hover:text-yellow-800"
                onClick={() => handleEditClick(product)}
              >
                <FaEdit className="w-6 h-6" title="Edit" />
              </button>
              <button 
                className="text-red-600 hover:text-red-800"
                onClick={() => handleDeleteClick(product._id)}
              >
                <FaTrash className="w-6 h-6" title="Delete" />
              </button> 
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Add/Edit Product Modal */}
  <AddProductModal
    show={isModalOpen}
    onClose={() => {
      setIsModalOpen(false);
      setProductToEdit(null); // Clear the edit form when the modal is closed
    }}
    onProductAdded={handleProductAdded}
    onProductUpdated={handleProductUpdated}
    productToEdit={productToEdit}
  />
</div>

        </main>
        </div>
    );
  }