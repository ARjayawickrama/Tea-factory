import React, { useState, useEffect, useRef } from 'react';
import { FaDollarSign, FaUsers } from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useLocation } from 'react-router-dom';

const SalaryDetails = () => {
    const location = useLocation();
    const { employeeName: initialName, employeeID: initialID, department: initialDept } = location.state || {};
  
    const [employeeName, setEmployeeName] = useState(initialName || '');
    const [employeeID, setEmployeeID] = useState(initialID || '');
    const [department, setDepartment] = useState(initialDept || '');

    const [earnings, setEarnings] = useState([
        { description: 'Basic Pay', amount: '' },
        { description: 'Overtime Allowance', amount: '' },
        { description: 'Other Allowance', amount: '' },
    ]);

    const [deductions, setDeductions] = useState([
        { description: 'Loss of Pay', amount: '' },
        { description: 'Loan Repayment', amount: '' },
        { description: 'National Insurance', amount: '' },
        { description: 'Tax', amount: '' },
        { description: 'EPF', amount: '' },
    ]);

    const [totalEarnings, setTotalEarnings] = useState(0);
    const [totalDeductions, setTotalDeductions] = useState(0);
    const [netPay, setNetPay] = useState(0);

    const salaryRef = useRef(null);

    useEffect(() => {
        const totalEarningsAmount = earnings.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
        const totalDeductionsAmount = deductions.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
        const netPayAmount = totalEarningsAmount - totalDeductionsAmount;

        setTotalEarnings(totalEarningsAmount);
        setTotalDeductions(totalDeductionsAmount);
        setNetPay(netPayAmount);
    }, [earnings, deductions]);

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(num);
    };

    const handleEarningsChange = (index, key, value) => {
        const updatedEarnings = earnings.map((item, i) =>
            i === index ? { ...item, [key]: value } : item
        );
        setEarnings(updatedEarnings);
    };

    const handleDeductionsChange = (index, key, value) => {
        const updatedDeductions = deductions.map((item, i) =>
            i === index ? { ...item, [key]: value } : item
        );
        setDeductions(updatedDeductions);
    };

    const generatePDF = () => {
        const input = salaryRef.current;
        const scale = 2; 
        html2canvas(input, { scale: scale }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');

            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210; 
            const pageHeight = 297; 
            const imgHeight = (canvas.height * imgWidth) / canvas.width; 
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`${employeeName}_payslip.pdf`);
        });
    };

    return (
        <div className="flex h-screen">
            <div className="h-full bg-stone-800 text-white w-64 p-6">
                <nav>
                    <ul className="space-y-6">
                        <li>
                            <button className="flex items-center bg-amber-500 p-4 w-full rounded-lg">
                                <FaUsers className="w-8 h-8 mr-4" />
                                <span>Employee Management</span>
                            </button>
                        </li>
                        <li>
                            <button className="flex items-center bg-amber-500 p-4 w-full rounded-lg">
                                <FaDollarSign className="w-8 h-8 mr-4" />
                                <span>Salary Details</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            <main className="ml-30 p-8 w-full">
                <h1 className="text-3xl font-bold mb-6">Salary Details</h1>
                
                <div ref={salaryRef}>
                    <div className="grid grid-cols-3 gap-6 mb-8">
                        <div>
                            <label className="block text-lg font-semibold mb-3">Employee Name:</label>
                            <input
                                type="text"
                                value={employeeName}
                                onChange={(e) => setEmployeeName(e.target.value)}
                                className="border p-2 rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold mb-3">Employee ID:</label>
                            <input
                                type="text"
                                value={employeeID}
                                onChange={(e) => setEmployeeID(e.target.value)}
                                className="border p-2 rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold mb-3">Department:</label>
                            <input
                                type="text"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="border p-2 rounded w-full"
                            />
                        </div>
                    </div>

                    <div className="flex space-x-12">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Earnings</h2>
                            <table className="w-full border border-gray-300">
                                <tbody>
                                    {earnings.map((item, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="px-4 py-2">{item.description}</td>
                                            <td className="px-4 py-2 text-right">
                                                <input
                                                    type="number"
                                                    value={item.amount}
                                                    onChange={(e) => handleEarningsChange(index, 'amount', e.target.value)}
                                                    className="w-full text-right p-2 border rounded"
                                                    placeholder="Enter amount"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="border-t font-bold">
                                        <td className="px-4 py-2">Total Earnings</td>
                                        <td className="px-4 py-2 text-right">{formatNumber(totalEarnings)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Deductions</h2>
                            <table className="w-full border border-gray-300">
                                <tbody>
                                    {deductions.map((item, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="px-4 py-2">{item.description}</td>
                                            <td className="px-4 py-2 text-right">
                                                <input
                                                    type="number"
                                                    value={item.amount}
                                                    onChange={(e) => handleDeductionsChange(index, 'amount', e.target.value)}
                                                    className="w-full text-right p-2 border rounded"
                                                    placeholder="Enter amount"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="border-t font-bold">
                                        <td className="px-4 py-2">Total Deductions</td>
                                        <td className="px-4 py-2 text-right">{formatNumber(totalDeductions)}</td>
                                    </tr>
                                    <tr className="border-t font-bold">
                                        <td className="px-4 py-2">Net Pay</td>
                                        <td className="px-4 py-2 text-right">{formatNumber(netPay)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-right">
                    <button 
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg"
                        onClick={generatePDF}
                    >
                        Generate PDF
                    </button>
                </div>
            </main>
        </div>
    );
};

export default SalaryDetails;
