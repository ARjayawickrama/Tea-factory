import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CreateFinancialRecord from "../../AdminPages/FinancialManagement/CreateFinancialRecord";
import { Grid, Paper, Typography, Box } from "@mui/material";
import MyVideo1 from "../../../assets/Admin123.mp4";
import { Link } from "react-router-dom";
import { IoCaretBack } from "react-icons/io5";
export default function FinancialManagement() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    transactionName: "",
    amount: "",
    date: "",
    category: "",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleNavigate = () => {
    navigate("/request-accept"); // Replace with the correct path for RequestAccept
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    setFormData({
      transactionName: "",
      amount: "",
      date: "",
      category: "",
    });
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-stone-800 text-white transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <div className="min-h-screen relative flex flex-col">
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
                <Link
                  to="/adminhome"
                  className="p-4 cursor-pointer bg-amber-500 flex items-center"
                >
                  <IoCaretBack className="w-12 h-12 mr-4 justify-center relative ml-16" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 4, ml: "16rem" }}>
        {/* Grid Section */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                p: 4,
                textAlign: "center",
                cursor: "pointer",
                "&:hover": { boxShadow: 6 },
              }}
              onClick={() => navigate("/order")}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ color: "green", fontWeight: "bold" }}
              >
                Order Management
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                p: 4,
                textAlign: "center",
                cursor: "pointer",
                "&:hover": { boxShadow: 6 },
              }}
              onClick={() => navigate("/employee")}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ color: "red", fontWeight: "bold" }}
              >
                Employee Management
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                p: 4,
                textAlign: "center",
                cursor: "pointer",
                "&:hover": { boxShadow: 6 },
              }}
              onClick={() => navigate("/SuplierDetailsSend")}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ color: "purple", fontWeight: "bold" }}
              >
                Supplier Management
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Form Section */}
        <CreateFinancialRecord
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Box>
    </div>
  );
}
