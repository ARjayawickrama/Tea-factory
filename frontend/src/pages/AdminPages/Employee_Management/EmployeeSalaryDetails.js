import React, { useState, useEffect, useRef } from "react";
import { FaDollarSign, FaUsers } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";
import EmCalculation from "./EmCalculation";

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
      <div className="w-64 h-full p-6 text-white bg-stone-800">
        <nav>
          <ul className="space-y-6">
            <li>
              <button className="flex items-center w-full p-4 rounded-lg bg-amber-500">
                <FaUsers className="w-8 h-8 mr-4" />
                <span>Employee Management</span>
              </button>
            </li>
            <li>
              <button className="flex items-center w-full p-4 rounded-lg bg-amber-500">
                <FaDollarSign className="w-8 h-8 mr-4" />
                <span>Salary Details</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <main className="w-full p-8 ml-30">
        <h1 className="mb-6 text-3xl font-bold">Salary Details</h1>

        <div ref={salaryRef}>
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block mb-3 text-lg font-semibold">
                Employee Name:
              </label>
              <input
                type="text"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-3 text-lg font-semibold">
                Employee ID:
              </label>
              <input
                type="text"
                value={employeeID}
                onChange={(e) => setEmployeeID(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-3 text-lg font-semibold">
                Department:
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full p-2 border rounded"
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
