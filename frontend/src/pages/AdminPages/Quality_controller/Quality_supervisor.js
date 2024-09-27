import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUsers } from "react-icons/fa";
import { TextField, MenuItem } from "@mui/material"; // Import MUI components
import MyVideo1 from "../../../assets/Admin123.mp4";

import anju from "../../../assets/1.jpg";
export default function Quality_supervisor() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    typeOfTea: "",
    teaGrade: "",
    flavor: "",
    date: "",
    color: "",
    note: "",
  });
  const [errors, setErrors] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the input field is "note"
    if (name === "note") {
      // Capitalize the first letter
      const capitalizedValue =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      setForm({ ...form, [name]: capitalizedValue });

      // Validate note field in real-time
      if (capitalizedValue.length < 10) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          note: "Note must be at least 10 characters.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    } else {
      setForm({ ...form, [name]: value });

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.typeOfTea = form.typeOfTea ? "" : "This field is required.";
    tempErrors.teaGrade = form.teaGrade ? "" : "This field is required.";
    tempErrors.flavor = form.flavor ? "" : "This field is required.";
    tempErrors.date = form.date ? "" : "This field is required.";
    tempErrors.color = form.color ? "" : "This field is required.";
    tempErrors.note =
      form.note.length >= 10 ? "" : "Note must be at least 10 characters.";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await axios.post("http://localhost:5004/QualityController", form);
        setForm({
          typeOfTea: "",
          teaGrade: "",
          flavor: "",
          date: "",
          color: "",
          note: "",
        });
      } catch (err) {
        console.error("Failed to submit tea entry", err);
      }
    }
  };

  const handleTeaIssueAlertClick = () => {
    navigate("/TeaIssueDisplay");
  };

  return (
    <div className="flex">
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-stone-800 text-white transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <div className="min-h-screen relative flex flex-col">
          {/* Background video */}
          <video
            src={MyVideo1}
            className="absolute inset-0 w-full h-full object-cover brightness-50"
            autoPlay
            loop
            muted
          />
        
          <nav className="relative z-10">
            <ul>
              <li>
                <a
                  href="/Quality_supervisor"
                  className="p-4 cursor-pointer bg-amber-500  flex items-center"
                >
                  <FaUsers className="w-8 h-8 mr-4" />
                  <span>Quality Supervisor</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <main
        className={`p-4 bg-cover bg-center flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } h-screen`}
        style={{
          backgroundImage: `url(${anju})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-white w-60 h-20 flex items-center justify-center rounded-md shadow-lg">
          <button
            className="text-xl font-bold text-white bg-teal-500 hover:bg-teal-600 transition duration-300 py-2 px-4 rounded"
            onClick={handleTeaIssueAlertClick}
          >
            Tea Issue Alert
          </button>
        </div>
        <div className="container mx-auto p-6 mt-14 ">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-4 w-3/4 justify-center items-center rounded-lg shadow-md relative left-36"
          >
            <div>
              <TextField
                select
                label="Type of Tea"
                name="typeOfTea"
                value={form.typeOfTea}
                onChange={handleChange}
                error={!!errors.typeOfTea}
                helperText={errors.typeOfTea}
                fullWidth
                variant="outlined"
              >
                <MenuItem value="SILVER TIPS">SILVER TIPS</MenuItem>
                <MenuItem value="Orange Pekoe">Orange Pekoe</MenuItem>
                <MenuItem value="Flowery Broken Orange Pekoe">
                  Flowery Broken Orange Pekoe
                </MenuItem>
                <MenuItem value="Broken Orange Pekoe 1">
                  Broken Orange Pekoe 1
                </MenuItem>
                <MenuItem value="PEKOE">PEKOE</MenuItem>
                <MenuItem value="Broken Orange Pekoe">
                  Broken Orange Pekoe
                </MenuItem>
              </TextField>
            </div>

            <div>
              <TextField
                label="Tea Grade"
                name="teaGrade"
                value={form.teaGrade}
                onChange={handleChange}
                error={!!errors.teaGrade}
                helperText={errors.teaGrade}
                fullWidth
                variant="outlined"
              />
            </div>

            <div>
              <TextField
                label="Flavor"
                name="flavor"
                value={form.flavor}
                onChange={handleChange}
                error={!!errors.flavor}
                helperText={errors.flavor}
                fullWidth
                variant="outlined"
              />
            </div>

            <div>
              <TextField
                label="Color"
                name="color"
                value={form.color}
                onChange={handleChange}
                error={!!errors.color}
                helperText={errors.color}
                fullWidth
                variant="outlined"
              />
            </div>

            <div>
              <TextField
                label="Date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                error={!!errors.date}
                helperText={errors.date}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </div>

            <div>
              <TextField
                label="Note"
                name="note"
                value={form.note}
                onChange={handleChange}
                error={!!errors.note}
                helperText={errors.note}
                fullWidth
                variant="outlined"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 text-white bg-teal-500 font-semibold rounded-md shadow-md hover:bg-teal-600"
            >
              Add Tea Entry
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}