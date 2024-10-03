import React, { useState, useEffect, useRef } from "react";
import { FaDollarSign, FaUsers } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";
import EmCalculation from "../../AdminPages/EmployeeManagement/EmCalculation";
import MyVideo1 from "../../../assets/Admin123.mp4";
import { Link } from 'react-router-dom';
const SalaryDetails = () => {
  const location = useLocation();
  const {
    employeeName: initialName,
    employeeID: initialID,
    department: initialDept,
  } = location.state || {};

  const [employeeName, setEmployeeName] = useState(initialName || "");
  const [employeeID, setEmployeeID] = useState(initialID || "");
  const [department, setDepartment] = useState(initialDept || "");

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

  const handleEarningsChange = (index, key, value) => {
    const amount = parseFloat(value);
    if (!isNaN(amount) && amount >= 0) {
      // Validation: check for non-negative value
      const updatedEarnings = earnings.map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      );
      setEarnings(updatedEarnings);
    }
  };

  const handleDeductionsChange = (index, key, value) => {
    const amount = parseFloat(value);
    if (!isNaN(amount) && amount >= 0) {
      // Validation: check for non-negative value
      const updatedDeductions = deductions.map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      );
      setDeductions(updatedDeductions);
    }
  };

  const generatePDF = () => {
    const input = salaryRef.current;
    const scale = 2;
    html2canvas(input, { scale: scale }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${employeeName}_payslip.pdf`);
    });
  };

  return (
    <div className="flex h-screen">
      <div className="min-h-screen relative flex flex-col">
        <video
          src={MyVideo1}
          className="absolute inset-0 w-full h-full object-cover brightness-50"
          autoPlay
          loop
          muted
        />

        <nav className="relative z-10 w-60">
          <ul>
            <li>
              <Link
                to="/salary-details" // Add the target route here
                className="p-4 cursor-pointer bg-amber-500 flex items-center hover:bg-amber-600 transition duration-200"
              >
                <FaUsers className="w-8 h-8 mr-4 text-white" />
                {/* Adjust margin here */}
                <span className="text-lg font-semibold text-white">
                  Salary Details
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <main className="ml-30 p-8 w-full">
        <h1 className="text-3xl font-bold mb-6">Salary Details</h1>

        <div ref={salaryRef}>
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-lg font-semibold mb-3">
                Employee Name:
              </label>
              <input
                type="text"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-3">
                Employee ID:
              </label>
              <input
                type="text"
                value={employeeID}
                onChange={(e) => setEmployeeID(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-3">
                Department:
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
          </div>
        </div>

        <EmCalculation
          earnings={earnings}
          deductions={deductions}
          onEarningsChange={handleEarningsChange}
          onDeductionsChange={handleDeductionsChange}
        />
      </main>
    </div>
  );
};

export default SalaryDetails;
