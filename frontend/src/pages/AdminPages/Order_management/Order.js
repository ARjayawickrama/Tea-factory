import React, { useState, useEffect } from 'react';
import { FaBox, FaList,FaEdit, FaTrash, } from 'react-icons/fa';
import axios from 'axios';

// Modal Component for Adding Product
function AddProductModal({ show, onClose, onProductAdded, productToEdit, onProductUpdated  }) {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [weight, setWeight] = useState('');
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
      setPrice(productToEdit.price);
      setWeight(productToEdit.weight);
      setProductImage(productToEdit.productImage || null); // Reset image since it won't be updated automatically
    }
  }, [productToEdit]);
 
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('weight', weight);
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
        <h2 className="mb-4 text-2xl font-bold">Add Product</h2>
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

          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold" htmlFor="productPrice">Price</label>
            <input
              id="productPrice"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter product price"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold" htmlFor="productWeight">Weight</label>
            <input
              id="productWeight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter product weight"
              required
            />
          </div>

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
  );
}

export default function Order() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);

  // Fetch products when component loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5004/DisplayProduct');
        setProducts(response.data);
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
        <h1 className="mb-6 text-3xl font-bold text-gray-800">Orders Manage</h1>

        <div className="flex justify-between mb-4 dashboard-header">
          <div className="flex items-center p-4 space-x-2 bg-gray-200 rounded dashboard-item">
            <FaBox className="w-6 h-6 text-gray-600" />
            <div>
              <h3 className="text-lg font-semibold">Total Orders</h3>
            </div>
          </div>

          <div className="flex items-center p-4 space-x-2 bg-gray-200 rounded dashboard-item">
            <FaList className="w-6 h-6 text-gray-600" />
            <div>
              <h3 className="text-lg font-semibold">View Order List</h3>
            </div>
          </div>
        </div>

        <div className="flex mb-4 space-x-4">
          <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 text-white bg-green-600 rounded">Add Product</button>
        </div>

        <div className="Product_list">
          <table className="w-full border-collapse">
            <thead>
              <tr className="font-extrabold text-white bg-green-800">
                <th className="p-2 border-b">Product Name</th>
                <th className="p-2 border-b">Product Image</th>
                <th className="p-2 border-b">Description</th>
                <th className="p-2 border-b">Weight</th>
                <th className="p-2 border-b">Price</th>
                <th className="p-2 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="p-2 border-b">{product.productName}</td>
                  <td className="p-2 border-b">
                    <img src={`http://localhost:5004/images/${product.productImage.split('/').pop()}`} 
                    alt={product.productName} 
                    className="object-cover w-16 h-16"/>
                  </td>
                  <td className="p-2 border-b">{product.description}</td>
                  <td className="p-2 border-b">{product.weight}</td>
                  <td className="p-2 border-b">Rs.{product.price}</td>
                  <td className="flex p-2 space-x-2 border-b">
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
        {/* Add Product Modal */}
       <AddProductModal
        show={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setProductToEdit(null); // Clear the edit form when the modal is closed
        }}
        onProductAdded={handleProductAdded}
        productToEdit={productToEdit}
        onProductUpdated={handleProductUpdated}
      />
      </main>

       
    </div>
  );
}
