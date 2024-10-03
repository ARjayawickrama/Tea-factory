// EmCalculation.js

import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ButtonGroup } from "./Button"; // Importing the ButtonGroup component
import PdfImage from "../../../assets/PdfImage.png"; // Import your image
export default function EmCalculation() {
  const location = useLocation();
  const [earnings, setEarnings] = useState([
    { description: "Basic Pay", amount: "" },
    { description: "Overtime Allowance", amount: "" },
    { description: "Other Allowance", amount: "" },
  ]);

  const [deductions, setDeductions] = useState([
    { description: "Loss of Pay", amount: "" },
    { description: "Loan Repayment", amount: "" },
    { description: "National Insurance", amount: "" },
    { description: "Tax", amount: "" },
    { description: "EPF", amount: "" },
  ]);

  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalDeductions, setTotalDeductions] = useState(0);
  const [netPay, setNetPay] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const salaryRef = useRef(null);

  useEffect(() => {
    const totalEarningsAmount = earnings.reduce(
      (sum, item) => sum + (parseFloat(item.amount) || 0),
      0
    );
    const totalDeductionsAmount = deductions.reduce(
      (sum, item) => sum + (parseFloat(item.amount) || 0),
      0
    );
    const netPayAmount = totalEarningsAmount - totalDeductionsAmount;

    setTotalEarnings(totalEarningsAmount);
    setTotalDeductions(totalDeductionsAmount);
    setNetPay(netPayAmount);
  }, [earnings, deductions]);

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const handleEarningsChange = (index, value) => {
    const numericValue = parseFloat(value);
    if (numericValue < 0) {
      setErrorMessage("Please enter a positive amount.");
      return;
    }
    setErrorMessage("");

    const updatedEarnings = earnings.map((item, i) =>
      i === index ? { ...item, amount: value } : item
    );
    setEarnings(updatedEarnings);
  };

  const [loading, setLoading] = useState(false); // State for loading
  const handleDeductionsChange = (index, value) => {
    const numericValue = parseFloat(value);
    if (numericValue < 0) {
      setErrorMessage("Please enter a positive amount.");
      return;
    }
    setErrorMessage("");

    const updatedDeductions = deductions.map((item, i) =>
      i === index ? { ...item, amount: value } : item
    );
    setDeductions(updatedDeductions);
  };

  const generatePDF = () => {
    // Hide all buttons before generating PDF
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      button.classList.add("hidden");
    });

    setLoading(true); // Set loading state to true while generating the PDF

    const input = salaryRef.current; // Reference to the element you want to capture
    const scale = 2; // Use a higher scale for better quality in the screenshot

    // Dynamically adjust PDF size based on screen dimensions
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const orientation = screenWidth > screenHeight ? "landscape" : "portrait"; // Detect orientation

    // Capture the HTML content with html2canvas
    html2canvas(input, { scale }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Create a PDF based on the detected screen size and orientation
      const pdf = new jsPDF(orientation, "mm", "a4"); // A4 page size for more flexibility
      const pdfWidth = pdf.internal.pageSize.getWidth(); // Dynamic PDF width
      const pdfHeight = pdf.internal.pageSize.getHeight(); // Dynamic PDF height

      // Calculate image dimensions to fit the PDF page
      const imgWidth = pdfWidth - 28; // Leave margins on both sides
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain the aspect ratio
      let heightLeft = imgHeight;
      let position = 0;

      // Load and add the header image
      const img = new Image();
      img.src = PdfImage;
      img.onload = () => {
        const headerImgWidth = pdfWidth - 28; // Leave margins on both sides for the header
        const headerImgHeight = (img.height * headerImgWidth) / img.width; // Maintain aspect ratio

        // Add the header image at the top of the PDF
        pdf.addImage(img, "PNG", 14, 10, headerImgWidth, headerImgHeight);

        let contentPositionY = headerImgHeight + 20; // Set margin below the header
        pdf.addImage(imgData, "PNG", 14, contentPositionY, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        // Add additional pages if content exceeds one page
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          contentPositionY = 10; // Reset position on new page
          pdf.addImage(
            imgData,
            "PNG",
            14,
            contentPositionY,
            imgWidth,
            imgHeight
          );
          heightLeft -= pdfHeight;
        }

        pdf.save("salary-details.pdf");

       
        buttons.forEach((button) => {
          button.classList.remove("hidden");
        });
        setLoading(false);
      };
    });
  };
  const resetFields = () => {
    setEarnings([
      { description: "Basic Pay", amount: "" },
      { description: "Overtime Allowance", amount: "" },
      { description: "Other Allowance", amount: "" },
    ]);
    setDeductions([
      { description: "Loss of Pay", amount: "" },
      { description: "Loan Repayment", amount: "" },
      { description: "National Insurance", amount: "" },
      { description: "Tax", amount: "" },
      { description: "EPF", amount: "" },
    ]);
    setErrorMessage("");
  };

  const validateInputs = () => {
    const invalidEarnings = earnings.some(
      (item) => parseFloat(item.amount) < 0
    );
    const invalidDeductions = deductions.some(
      (item) => parseFloat(item.amount) < 0
    );

    if (invalidEarnings || invalidDeductions) {
      setErrorMessage("Please enter valid positive amounts.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const saveSalaryData = async () => {
    if (!validateInputs()) return;

    const salaryData = {
      totalEarnings,
      totalDeductions,
      netPay,
      earnings,
      deductions,
    };

    try {
      const response = await axios.post(
        "http://localhost:5004/SalaryDetails",
        salaryData
      );
      if (response.status === 201 || response.status === 200) {
        alert("Salary data saved successfully!");
      } else {
        alert("Failed to save salary data.");
      }
    } catch (error) {
      console.error("Error saving salary data:", error);
      setErrorMessage("Error saving salary data. Please try again later.");
    }
  };

  const renderTable = (items, handleChange, isEarnings) => (
    <table className="w-full border border-gray-300">
      <tbody>
        {items.map((item, index) => (
          <tr key={index} className="border-b">
            <td className="px-4 py-2">{item.description}</td>
            <td className="px-4 py-2 text-right">
              <input
                type="number"
                value={item.amount}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-full text-right p-2 border rounded"
                placeholder="Enter amount"
              />
            </td>
          </tr>
        ))}
        <tr className="border-t font-bold">
          <td className="px-4 py-2">
            {isEarnings ? "Total Earnings" : "Total Deductions"}
          </td>
          <td className="px-4 py-2 text-right">
            {formatNumber(isEarnings ? totalEarnings : totalDeductions)}
          </td>
        </tr>
        {isEarnings && (
          <tr className="border-t font-bold">
            <td className="px-4 py-2">Net Pay</td>
            <td className="px-4 py-2 text-right">{formatNumber(netPay)}</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <div ref={salaryRef} className="p-4">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="flex space-x-12">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Earnings</h2>
          {renderTable(earnings, handleEarningsChange, true)}
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Deductions</h2>
          {renderTable(deductions, handleDeductionsChange, false)}
        </div>
      </div>
      <ButtonGroup
        generatePDF={generatePDF}
        resetFields={resetFields}
        saveSalaryData={saveSalaryData}
      />
    </div>
  );
}
