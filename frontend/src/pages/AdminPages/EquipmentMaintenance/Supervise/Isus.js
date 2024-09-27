import React, { useState, useEffect } from "react"; // Import useEffect
import axios from "axios";
import { Button, TextField, Typography, Modal } from "@mui/material";

const Isus = ({ modalIsOpen, setModalIsOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "", // Initialize as an empty string
    note: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    date: "",
    note: "",
  });

  // Set today's date when the modal opens
  useEffect(() => {
    if (modalIsOpen) {
      const todayDate = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD format
      setFormData((prevData) => ({ ...prevData, date: todayDate }));
    }
  }, [modalIsOpen]); // Run this effect when modalIsOpen changes

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent non-letter characters from being entered in the Name field
    if (name === "name" && /[^A-Za-z]/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name must contain only letters.",
      }));
      return; // Do not update state if the input is invalid
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "", // Clear error if input is valid
      }));
    }

    // Update form data
    setFormData({ ...formData, [name]: value });

    // Real-time validation for Date
    if (name === "date") {
      const today = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD format
      setErrors((prevErrors) => ({
        ...prevErrors,
        date: value < today ? "Date cannot be in the past." : "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation check before submitting
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) {
      alert("Please correct the errors before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5004/EQIsus",
        formData
      );
      console.log("New entry added:", response.data);
      setFormData({ name: "", date: "", note: "" });
      setErrors({ name: "", date: "", note: "" }); // Reset errors
      setModalIsOpen(false);
    } catch (error) {
      console.error("Error adding entry:", error);
    }
  };

  return (
    <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
      <div className="flex items-center justify-center min-h-screen ml-44">
        <div className="bg-white rounded-lg p-6 shadow-2xl w-3/5 md:w-1/3">
          <Typography variant="h6" component="h2" className="font-bold">
            Isus Modal
          </Typography>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                required
                placeholder="Enter your name"
                error={!!errors.name}
                helperText={errors.name}
              />
            </div>
            <div className="mb-4">
              <TextField
                label="Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                required
                InputLabelProps={{ shrink: true }}
                error={!!errors.date}
                helperText={errors.date}
              />
            </div>
            <div className="mb-4">
              <TextField
                label="Note"
                name="note"
                value={formData.note}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                required
                multiline
                rows={3}
                placeholder="Enter your note"
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="ml-2 w-44 h-8"
            >
              Submit
            </Button>
          </form>
          <Button
            onClick={() => setModalIsOpen(false)}
            variant="contained"
            color="secondary"
            className="mt-4 ml-2 w-44 h-8"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Isus;
