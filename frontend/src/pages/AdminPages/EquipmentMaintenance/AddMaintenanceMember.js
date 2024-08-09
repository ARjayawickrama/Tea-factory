import React, { useState } from "react";
import axios from "axios";

export default function AddMaintenanceMember() {
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    phone_number: "",
    email: "",
    type: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5004/MaintaininMember",
        formData
      );
      setMessage("Maintainin member added successfully!");

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
      <form onSubmit={handleSubmit} className=" relative left-9 ">
        <div>
          <label className="block">Name:</label>
          <input
           className="border  rounded-md w-64"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block">Area:</label>
          <input
            className="border  rounded-md w-64"
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block">Phone Number:</label>
          <input
            className="border  rounded-md w-64"
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block">Email:</label>
          <input
            className="border  rounded-md w-64"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block">Type:</label>
          <input
            className="border  rounded-md w-64"
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className=" bg-amber-500 w-64 mt-1 h-10 rounded text-white"
        >
          ADD
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
