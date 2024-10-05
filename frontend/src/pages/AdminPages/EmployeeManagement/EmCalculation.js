import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ButtonGroup } from "./Button";
import PdfImage from "../../../assets/PdfImage.png";

export default function EmCalculation() {
  const location = useLocation();
  const { basicPay: initialPay } = location.state || {};
  const [basicPay, setBasicPay] = useState(initialPay || "");
  const [overtimeHours, setOvertimeHours] = useState(0); // Overtime hours state
  const [overtimePay, setOvertimePay] = useState(0); // Overtime pay rate state
  const [earnings, setEarnings] = useState([
    { description: "Basic Pay", amount: basicPay },
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

  // EPF percentage constants
  const employeeEPFRate = 0.08; // 8% for the employee
  const employerEPFRate = 0.12; // 12% for the employer

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

  // Function to format number
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  // Function to calculate tax
  const calculateTax = (basicPay) => {
    let tax = 0;
    if (basicPay > 308333) {
      tax = (basicPay - 308333) * 0.36 + 12500 + 15000 + 17500 + 21667;
    } else if (basicPay > 266667) {
      tax = (basicPay - 266667) * 0.30 + 12500 + 15000 + 17500;
    } else if (basicPay > 225000) {
      tax = (basicPay - 225000) * 0.24 + 12500 + 15000;
    } else if (basicPay > 183333) {
      tax = (basicPay - 183333) * 0.18 + 12500;
    } else if (basicPay > 141667) {
      tax = (basicPay - 141667) * 0.12 + 12500;
    } else if (basicPay > 100000) {
      tax = (basicPay - 100000) * 0.06;
    }
    return tax.toFixed(2);
  };

  // Function to calculate EPF
  const calculateEPF = (basicPay) => {
    const employeeEPF = basicPay * employeeEPFRate;
    const employerEPF = basicPay * employerEPFRate;
    return {
      employeeEPF: employeeEPF.toFixed(2),
      employerEPF: employerEPF.toFixed(2),
    };
  };

  // Function to handle earnings changes
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

    if (earnings[index].description === "Basic Pay") {
      const basicPay = numericValue || 0;
      const taxAmount = calculateTax(basicPay);
      const { employeeEPF } = calculateEPF(basicPay);

      const updatedDeductions = deductions.map((deduction) => {
        if (deduction.description === "Tax") {
          return { ...deduction, amount: taxAmount };
        } else if (deduction.description === "EPF") {
          return { ...deduction, amount: employeeEPF };
        }
        return deduction;
      });
      setDeductions(updatedDeductions);
    }
  };


  const {
    employeeName: initialName,
    employeeID: initialID,
    department: initialDept,
    employeeSalary: initialSalary,
  } = location.state || {};
  const [employeeName, setEmployeeName] = useState(initialName || "");
  const [employeeID, setEmployeeID] = useState(initialID || "");
  const [department, setDepartment] = useState(initialDept || "");
  const [employeeSalary, setSalary] = useState(initialSalary || "");

  const [loading, setLoading] = useState(false);
  // Handle overtime changes
  const handleOvertimeChange = (value) => {
    const numericValue = parseFloat(value);
    if (numericValue < 0) {
      setErrorMessage("Please enter a positive number of hours.");
      return;
    }
    setOvertimeHours(numericValue);
    calculateOvertimeAllowance(numericValue, overtimePay);
  };

  // Handle overtime pay rate changes
  const handleOvertimePayChange = (value) => {
    const numericValue = parseFloat(value);
    if (numericValue < 0) {
      setErrorMessage("Please enter a positive overtime pay rate.");
      return;
    }
    setOvertimePay(numericValue);
    calculateOvertimeAllowance(overtimeHours, numericValue);
  };

  // Calculate Overtime Allowance
  const calculateOvertimeAllowance = (hours, payRate) => {
    const overtimeAllowance = hours * payRate;
    const updatedEarnings = earnings.map((item) =>
      item.description === "Overtime Allowance"
        ? { ...item, amount: overtimeAllowance.toFixed(2) }
        : item
    );
    setEarnings(updatedEarnings);
  };

  // Render earnings and deductions table
  const renderTable = (items, handleChange, isEarnings) => {
    return (
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left">Description</th>
            <th className="text-right">Amount</th>
            
          </tr>
          <p className=" text-red-800">Basic Pay {initialSalary}</p>
        </thead>
        
        <tbody>
          
          {items.map((item, index) => (
            <tr key={index}>
            
              <td>{item.description}</td>
              
              <td>
                
                <input
                  type="number"
                  value={item.amount || ""}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="w-full text-right p-2 border rounded"
                  placeholder={`Enter ${isEarnings ? "Earnings" : "Deductions"}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // Function to generate PDF
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


  const saveSalaryData = async () => {
    const salaryData = {
      totalEarnings,
      totalDeductions,
      netPay,
      earnings,
      deductions,
      overtimeHours,
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
    setBasicPay("");
    setOvertimeHours(0);
    setOvertimePay(0);
  };

  return (
    <div className="salary-calculation-container" ref={salaryRef}>
      <h1 className="text-2xl font-bold mb-6">Salary Calculation </h1>

      {errorMessage && (
        <div className="mb-4 text-red-500">
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-6">
         
          <div className="mb-4">
            
            
          </div>
          
          <div className="mb-4">
            <label htmlFor="overtimeHours" className="mr-2">
              Overtime Hours:
            </label>
            <input
              type="number"
              id="overtimeHours"
              value={overtimeHours}
              onChange={(e) => handleOvertimeChange(e.target.value)}
              className="border border-gray-100 p-1 rounded"
              placeholder="Enter overtime hours"
            />
          </div>
         
          <div className="mb-3">
            <label htmlFor="overtimePay" className="mr-2">
              Overtime Pay:
            </label>
            
            <input
              type="number"
              id="overtimePay"
              value={overtimePay}
              onChange={(e) => handleOvertimePayChange(e.target.value)}
              className="border border-gray-100 p-1 rounded"
              placeholder="Enter overtime pay rate"
            />
          </div>
          {renderTable(earnings, handleEarningsChange, true)}
          <p>Total Earnings: {formatNumber(totalEarnings)}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Deductions</h2>
          {renderTable(deductions, handleEarningsChange, false)}
          <p>Total Deductions: {formatNumber(totalDeductions)}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Net Pay: {formatNumber(netPay)}</h3>
      </div>

      <ButtonGroup
        generatePDF={generatePDF}
        resetFields={resetFields}
        saveSalaryData={saveSalaryData}
      />
    </div>
  );
}
