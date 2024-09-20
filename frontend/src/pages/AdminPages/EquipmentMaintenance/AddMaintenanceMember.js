import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddMaintenanceMember({ isFormEnabled, request }) {
  const [formData, setFormData] = useState({
    name: request ? request.name : "",
    area: request ? request.area : "",
    phone_number: request ? request.phone_number : "",
    email: request ? request.email : "",
    type: request ? request.type : "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (request) {
      setFormData({
        name: request.name,
        area: request.area,
        phone_number: request.phone_number,
        email: request.email,
        type: request.type,
      });
    }
  }, [request]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    // Validate name: must start with a capital letter, no numbers allowed
    if (!/^[A-Z][a-zA-Z\s]*$/.test(formData.name)) {
      newErrors.name = "Name must start with a capital letter and contain no numbers.";
    }

    // Validate area: must start with a capital letter, no numbers allowed
    if (!/^[A-Z][a-zA-Z\s]*$/.test(formData.area)) {
      newErrors.area = "Area must start with a capital letter and contain no numbers.";
    }

    // Validate email: must be in proper email format
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }

    // Validate phone number: must be 10 digits and start with 0
    if (!/^0\d{9}$/.test(formData.phone_number)) {
      newErrors.phone_number = "Phone number must be 10 digits and start with 0.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post("http://localhost:5004/MaintaininMember", formData);
      setMessage("Maintainin member added successfully!");
      setErrors({});
      setFormData({
        name: "",
        area: "",
        phone_number: "",
        email: "",
        type: "",
      });
    } catch (error) {
      setMessage("Failed to add maintainin member.");
      console.error("Error adding maintainin member:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='mr-1'>
        <div>
          <label className="block">Name:</label>
          <input
            className="border rounded-md w-64"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={!isFormEnabled}
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label className="block">Area:</label>
          <input
            className="border rounded-md w-64"
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
            disabled={!isFormEnabled}
          />
          {errors.area && <p className="text-red-500">{errors.area}</p>}
        </div>
        <div>
          <label className="block">Phone Number:</label>
          <input
            className="border rounded-md w-64"
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
            disabled={!isFormEnabled}
          />
          {errors.phone_number && <p className="text-red-500">{errors.phone_number}</p>}
        </div>
        <div>
          <label className="block">Email:</label>
          <input
            className="border rounded-md w-64"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={!isFormEnabled}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label className="block">Type:</label>
          <input
            className="border rounded-md w-64"
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            disabled={!isFormEnabled}
          />
        </div>
        <button
          type="submit"
          className={`bg-amber-500 w-64 mt-1 h-10 rounded text-white ${!isFormEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!isFormEnabled}
        >
          ADD
        </button>
      </form>
      
      {message && <p>{message}</p>}
    </div>
  );
}
