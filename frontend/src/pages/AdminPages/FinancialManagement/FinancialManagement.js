import React, { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CreateFinancialRecord from "../../AdminPages/FinancialManagement/CreateFinancialRecord";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import axios from "axios";
import jsPDF from "jspdf"; // Import jsPDF
import { IoCaretBack } from "react-icons/io5";
import MyVideo1 from "../../../assets/Admin123.mp4";
import { Link } from "react-router-dom";

export default function FinancialManagement() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    transactionType: "Income",
    user: "",
    date: "",
    category: "",
    description: "",
    paymentMethod: "",
    name: "",
    department: "",
    nic: "",
    AmountIncome: "",
    AmountExpense: "",
    Propite: "",
  });

  const [financialRecords, setFinancialRecords] = useState([]);

  useEffect(() => {
    const fetchFinancialRecords = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5004/api/financial-records"
        );
        console.log("Fetched records:", response.data);
        setFinancialRecords(response.data);
      } catch (error) {
        console.error("Error fetching financial records:", error);
      }
    };

    fetchFinancialRecords();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...formData };

    if (formData.transactionType === "Income") {
      payload.AmountExpense = ""; // Clear AmountExpense for Income transaction
    } else if (formData.transactionType === "Expense") {
      payload.AmountIncome = ""; // Clear AmountIncome for Expense transaction
    }

    console.log("Submitting payload:", payload);

    try {
      const response = await axios.post(
        "http://localhost:5004/api/financial-records",
        payload
      );
      console.log("Form submitted:", response.data);

      setFormData({
        transactionType: "Income",
        user: "",
        date: "",
        category: "",
        description: "",
        paymentMethod: "",
        name: "",
        department: "",
        nic: "",
        AmountIncome: "",
        AmountExpense: "",
        Propite: "",
      });

      setFinancialRecords((prevRecords) => [...prevRecords, response.data]);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const incomes = financialRecords.filter(
    (record) => record.transactionType === "Income"
  );
  const expenses = financialRecords.filter(
    (record) => record.transactionType === "Expense"
  );

  const totalIncome = incomes.reduce((acc, record) => {
    const user = parseFloat(record.user) || 0;
    return acc + user;
  }, 0);

  const totalExpense = expenses.reduce((acc, record) => {
    const user = parseFloat(record.user) || 0;
    return acc + user;
  }, 0);

  const Propite = expenses.reduce((acc, record) => {
    const user = parseFloat(record.user) || 0;
    return acc + user;
  }, 0);

  let profit;
  let profitStatus;

  if (totalIncome > totalExpense) {
    profit = totalIncome - totalExpense;
    profitStatus = "Profit";
  } else if (totalIncome < totalExpense) {
    profit = totalExpense - totalIncome;
    profitStatus = "Loss";
  } else {
    profit = 0;
    profitStatus = "Break Even";
  }

  // Function to download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Financial Records", 14, 16);
    doc.autoTable({
      head: [["Name", "Amount", "Date"]],
      body: [
        ...incomes.map((income) => [income.name, income.user, income.date]),
        ...expenses.map((expense) => [
          expense.name,
          expense.user,
          expense.date,
        ]),
      ],
      startY: 20,
    });
    doc.text(
      `Total Income: ${totalIncome.toFixed(2)}`,
      14,
      doc.autoTable.previous.finalY + 10
    );
    doc.text(
      `Total Expense: ${totalExpense.toFixed(2)}`,
      14,
      doc.autoTable.previous.finalY + 15
    );
    doc.text(
      `Profit: ${profit.toFixed(2)} - Status: ${profitStatus}`,
      14,
      doc.autoTable.previous.finalY + 20
    );

    doc.save("financial_records.pdf");
  };

  return (
    <div className="flex">
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
                <IoCaretBack className="w-24 h-12 mr-4 text-white  justify-center relative ml-7" />
              </Link>
            </li>

            <li>
              <a className="p-4 cursor-pointer bg-stone-800  flex items-center">
                <span className="  ml-5 text-white">Financial</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <Box sx={{ flexGrow: 1, p: 4, ml: "16rem" }}>
        <Grid container spacing={3} mb={4} className=" relative right-28">
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

        <CreateFinancialRecord
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />

        {/* Download PDF Button */}
        <Button variant="contained" color="primary" onClick={downloadPDF}>
          Download PDF
        </Button>

        {/* Financial Records Table */}
        <Grid container spacing={3} mt={4} className="relative right-28">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Incomes
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name </TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {incomes.map((income) => (
                    <TableRow key={income._id}>
                      <TableCell>{income.name}</TableCell>
                      <TableCell>{income.user}</TableCell>
                      <TableCell>{income.date}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={4} align="right">
                      <strong>Total Income:</strong>
                    </TableCell>
                    <TableCell>
                      <strong>{totalIncome.toFixed(2)}</strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Expenses
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense._id}>
                      <TableCell>{expense.name}</TableCell>
                      <TableCell>{expense.user}</TableCell>
                      <TableCell>{expense.date}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={4} align="right">
                      <strong>Total Expense:</strong>
                    </TableCell>
                    <TableCell>
                      <strong>{totalExpense.toFixed(2)}</strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={4} className="relative right-28">
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Profit/Loss Statement
            </Typography>
            <Paper sx={{ p: 2 }}>
              <Typography variant="body1">
                Total Income: {totalIncome.toFixed(2)}
              </Typography>
              <Typography variant="body1">
                Total Expense: {totalExpense.toFixed(2)}
              </Typography>
              <Typography variant="body1">
                Profit: {profit.toFixed(2)} ({profitStatus})
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
