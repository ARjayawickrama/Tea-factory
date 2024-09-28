import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CreateFinancialRecord from "../../AdminPages/FinancialManagement/CreateFinancialRecord";
import { Grid, Paper, Typography, Box } from "@mui/material";

export default function FinancialManagement() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    transactionName: "",
    amount: "",
    date: "",
    category: "",
  });

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
      <div className="fixed top-0 left-0 h-full bg-stone-800 text-white w-64 shadow-lg">
        <nav>
          <ul>
            <li
              className="p-4 cursor-pointer bg-amber-600 flex items-center"
              onClick={() => navigate("/financial-management")}
            >
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Financial Management</span>
            </li>
          </ul>
        </nav>
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
