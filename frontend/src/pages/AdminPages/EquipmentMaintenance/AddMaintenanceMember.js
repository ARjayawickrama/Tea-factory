import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Typography } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'; 
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
      newErrors.name =
        "Name must start with a capital letter and contain no numbers.";
    }

    // Validate area: must start with a capital letter, no numbers allowed
    if (!/^[A-Z][a-zA-Z\s]*$/.test(formData.area)) {
      newErrors.area =
        "Area must start with a capital letter and contain no numbers.";
    }

    // Validate email: must be in proper email format
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }

    // Validate phone number: must be 10 digits and start with 0
    if (!/^0\d{9}$/.test(formData.phone_number)) {
      newErrors.phone_number =
        "Phone number must be 10 digits and start with 0.";
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
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          Add Maintenance Member
        </Typography>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={!isFormEnabled}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Area"
          name="area"
          value={formData.area}
          onChange={handleChange}
          required
          disabled={!isFormEnabled}
          error={!!errors.area}
          helperText={errors.area}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone Number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          required
          disabled={!isFormEnabled}
          error={!!errors.phone_number}
          helperText={errors.phone_number}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={!isFormEnabled}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="repair-machine-type-label">
            Repair Machine Type
          </InputLabel>
          <Select
            margin="dense"
            name="type"
            label="Repair Machine Type"
            type="text"
            value={formData.type}
            onChange={handleChange}
            error={!!errors.type}
          >
            <MenuItem value="Electrical Technician">
              Electrical Technician
            </MenuItem>
            <MenuItem value="Mechanical Technician">
              Mechanical Technician
            </MenuItem>
            <MenuItem value="Electronics Technician">
              Electronics Technician
            </MenuItem>
          </Select>
          {errors.type && <p style={{ color: "red" }}>{errors.type}</p>}
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!isFormEnabled}
          sx={{ mt: 2 }}
        >
          ADD
        </Button>
      </form>

      {message && (
        <Typography variant="body1" color="success.main">
          {message}
        </Typography>
      )}
    </div>
  );
}
