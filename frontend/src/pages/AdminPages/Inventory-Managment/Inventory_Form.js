import React, { useState, useEffect } from "react";
import { FaBox } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function InventoryForm() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    productId: "",
    product: "",
    manufactureDate: "",
    expireDate: "",
    weight: "",
    items: "",
    description: "",
  });
  const weightOptions = ["250g", "500g", "1kg"];
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const generateRandomId = () => Math.floor(Math.random() * 1000000).toString();

  useEffect(() => {
    if (!formData.productId) {
      setFormData((prevData) => ({
        ...prevData,
        productId: generateRandomId(),
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent numbers, symbols, or space from being typed as the first character in description
    if (name === "description" && /^\d|[@#$%^&*(),.?":{}|<>]/.test(value[0])) {
      return; // Prevent the input if the first character is a number or symbol
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Call validation as user types/selects
    validateField(name, value);
  };

  // Runtime validation for each field
  const validateField = (field, value) => {
    let newErrors = { ...errors };

    switch (field) {
      case "product":
        if (!value) {
          newErrors.product = "Product name is required";
        } else {
          delete newErrors.product;
        }
        break;
      case "manufactureDate":
        const today = new Date();
        const maxDate = new Date(today);
        const minDate = new Date(today.setFullYear(today.getFullYear() - 5));

        if (!value) {
          newErrors.manufactureDate = "Manufacture date is required";
        } else if (new Date(value) > maxDate) {
          newErrors.manufactureDate = "Manufacture date cannot be in the future";
        } else if (new Date(value) < minDate) {
          newErrors.manufactureDate = "Manufacture date must be within the last 5 years";
        } else {
          delete newErrors.manufactureDate;
        }
        break;
      case "expireDate":
        if (!value) {
          newErrors.expireDate = "Expire date is required";
        } else if (value <= formData.manufactureDate) {
          newErrors.expireDate = "Expire date must be after manufacture date";
        } else {
          delete newErrors.expireDate;
        }
        break;
      case "weight":
        if (!weightOptions.includes(value)) {
          newErrors.weight = "Weight must be one of the following: 250g, 500g, 1kg";
        } else {
          delete newErrors.weight;
        }
        break;
      case "items":
        if (!value || value <= 0) {
          newErrors.items = "Items must be greater than 0";
        } else {
          delete newErrors.items;
        }
        break;
      case "description":
        // Check if description starts with a number or symbol
        if (!value || value.length < 10) {
          newErrors.description = "Description must be at least 10 characters";
        } else if (/^\d|[@#$%^&*(),.?":{}|<>]/.test(value[0])) {
          newErrors.description = "Description cannot start with a number or symbol";
        } else {
          delete newErrors.description;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors); // Update the error state
  };

  const resetForm = () => {
    setFormData({
      productId: generateRandomId(),
      product: "",
      manufactureDate: "",
      expireDate: "",
      weight: "",
      items: "",
      description: "",
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation check before submission
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const updatedFormData = { ...formData };
        const response = await axios.post(
          "http://localhost:5004/InventoryProduct",
          updatedFormData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Response:", response.data);
        resetForm();
        navigate("/Inventory_Managment");
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        setErrors({ apiError: "Failed to submit form. Please try again." });
      }
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.product) {
      newErrors.product = "Product name is required";
    }
    if (!formData.manufactureDate) {
      newErrors.manufactureDate = "Manufacture date is required";
    } else {
      const today = new Date();
      const maxDate = new Date(today);
      const minDate = new Date(today.setFullYear(today.getFullYear() - 5));

      if (new Date(formData.manufactureDate) > maxDate) {
        newErrors.manufactureDate = "Manufacture date cannot be in the future";
      } else if (new Date(formData.manufactureDate) < minDate) {
        newErrors.manufactureDate = "Manufacture date must be within the last 5 years";
      }
    }

    if (!formData.expireDate) {
      newErrors.expireDate = "Expire date is required";
    }
    if (
      formData.expireDate &&
      formData.expireDate <= formData.manufactureDate
    ) {
      newErrors.expireDate = "Expire date must be after manufacture date";
    }
    if (!weightOptions.includes(formData.weight)) {
      newErrors.weight = "Weight must be one of the following: 250g, 500g, 1kg";
    }
    if (!formData.items || formData.items <= 0) {
      newErrors.items = "Items must be greater than 0";
    }
    if (!formData.description || formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    } else if (/^\d|[@#$%^&*(),.?":{}|<>]/.test(formData.description[0])) {
      newErrors.description = "Description cannot start with a number or symbol";
    }

    return newErrors;
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <nav>
          <ul>
            <li className="p-4 cursor-pointer bg-amber-500 mt-9 flex items-center">
              <FaBox className="w-8 h-8 mr-4" />
              <span className="text-lg font-semibold">Form</span>
            </li>
          </ul>
        </nav>
      </div>

      <main
        className={`flex-1 p-6 transition-transform duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Stock</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg space-y-6"
        >
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">
              Product ID (Auto-generated):
            </label>
            <input
              type="text"
              name="productId"
              value={formData.productId}
              readOnly
              className="p-3 border border-gray-300 rounded-lg bg-gray-200"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="product"
            >
              Product Name
            </label>
            <select
              name="product"
              value={formData.product}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="">Select a product</option>
              <option value="Broken Orange Pekoe">Broken Orange Pekoe</option>
              <option value="Broken Orange Pekoe 1">Broken Orange Pekoe 1</option>
              <option value="Broken Orange Pekoe Fannings">Broken Orange Pekoe Fannings</option>
              <option value="Dust 1">Dust 1</option>
              <option value="Flowery Broken Orange Pekoe">Flowery Broken Orange Pekoe</option>
              <option value="Flowery Broken Orange Pekoe Fanning Extra Special">Flowery Broken Orange Pekoe Fanning Extra Special</option>
              <option value="Flowery Fannings 1">Flowery Fannings 1</option>
              <option value="Golden Tips">Golden Tips</option>
              <option value="Gunpowder">Gunpowder</option>
              <option value="Orange Pekoe">Orange Pekoe</option>
              <option value="Silver Tips">Silver Tips</option>
            </select>
            {errors.product && (
              <p className="text-red-500 text-xs">{errors.product}</p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="manufactureDate"
            >
              Manufacture Date
            </label>
            <input
              type="date"
              name="manufactureDate"
              value={formData.manufactureDate}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg"
              required
            />
            {errors.manufactureDate && (
              <p className="text-red-500 text-xs">{errors.manufactureDate}</p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="expireDate"
            >
              Expire Date
            </label>
            <input
              type="date"
              name="expireDate"
              value={formData.expireDate}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg"
              required
            />
            {errors.expireDate && (
              <p className="text-red-500 text-xs">{errors.expireDate}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Weight</label>
            <select
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="">Select weight</option>
              {weightOptions.map((weight) => (
                <option key={weight} value={weight}>
                  {weight}
                </option>
              ))}
            </select>
            {errors.weight && (
              <p className="text-red-500 text-xs">{errors.weight}</p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="items"
            >
              Number of Items
            </label>
            <input
              type="number"
              name="items"
              value={formData.items}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg"
              required
            />
            {errors.items && (
              <p className="text-red-500 text-xs">{errors.items}</p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg"
              rows="4"
              required
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs">{errors.description}</p>
            )}
          </div>

          <div className="flex justify-end space-x-6">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg "
            >
              Submit
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-red-500 text-white px-4 py-2 rounded-lg "
            >
              Reset
            </button>
          </div>
          {errors.apiError && (
            <p className="text-red-500 text-xs">{errors.apiError}</p>
          )}
        </form>
      </main>
    </div>
  );
}
