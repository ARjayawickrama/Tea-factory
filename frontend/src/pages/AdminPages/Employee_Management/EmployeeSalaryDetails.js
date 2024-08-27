import React, { useState, useEffect } from 'react';
import axios from 'axios'; // If you plan to fetch data or handle API requests
import { FaDollarSign, FaRegUserCircle } from 'react-icons/fa'; // Example icons

const SalaryDetails = () => {
    const [employeeName, setEmployeeName] = useState('[Employee Name]');
    const [employeeID, setEmployeeID] = useState('[Employee ID]');
    const [department, setDepartment] = useState('[Department]');

    const [earnings, setEarnings] = useState([
        { description: 'Basic Pay', amount: 2250.00 },
        { description: 'Overtime Allowance', amount: 281.00 },
        { description: 'Other Allowance', amount: 115.00 },
    ]);

    const [deductions, setDeductions] = useState([
        { description: 'Loss of Pay', amount: 98.00 },
        { description: 'Loan Repayment', amount: 160.00 },
        { description: 'National Insurance', amount: 85.00 },
        { description: 'Tax', amount: 450.00 },
        { description: 'EPF', amount: 200.00 },
    ]);

    const [totalEarnings, setTotalEarnings] = useState(0);
    const [totalDeductions, setTotalDeductions] = useState(0);
    const [netPay, setNetPay] = useState(0);

    useEffect(() => {
        const totalEarningsAmount = earnings.reduce((sum, item) => sum + item.amount, 0);
        const totalDeductionsAmount = deductions.reduce((sum, item) => sum + item.amount, 0);
        const netPayAmount = totalEarningsAmount - totalDeductionsAmount;

        setTotalEarnings(totalEarningsAmount);
        setTotalDeductions(totalDeductionsAmount);
        setNetPay(netPayAmount);
    }, [earnings, deductions]);

    const handleEarningsChange = (index, value) => {
        const updatedEarnings = earnings.map((item, i) =>
            i === index ? { ...item, amount: parseFloat(value) || 0 } : item
        );
        setEarnings(updatedEarnings);
    };

    const handleDeductionsChange = (index, value) => {
        const updatedDeductions = deductions.map((item, i) =>
            i === index ? { ...item, amount: parseFloat(value) || 0 } : item
        );
        setDeductions(updatedDeductions);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="absolute top-0 left-0 h-full bg-stone-800 text-white w-64">
                <nav>
                    <ul>
                        <li className="p-4 cursor-pointer mt-9 flex items-center">
                            <FaDollarSign className="w-8 h-8 mr-4" />
                            <span>Employee Management</span>
                        </li>
                        {/* Add other sidebar items here */}
                    </ul>
                </nav>
                <nav>
                    <ul>
                        <li className="p-4 cursor-pointer mt-9 flex items-center">
                            <FaDollarSign className="w-8 h-8 mr-4" />
                            <span>Salary Details</span>
                        </li>
                        {/* Add other sidebar items here */}
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <main className="relative ml-64 flex-grow p-8"> {/* Changed 'left-64' to 'ml-64' */}
                <h1 className="text-2xl font-bold mb-4">Salary Details</h1>
                <div className="mb-6">
                    <p className="text-lg mb-2">
                        <strong>Employee Name:</strong>
                        <input
                            type="text"
                            value={employeeName}
                            onChange={(e) => setEmployeeName(e.target.value)}
                            className="border p-2 rounded w-full"
                        />
                    </p>
                    <p className="text-lg mb-2">
                        <strong>Employee ID:</strong>
                        <input
                            type="text"
                            value={employeeID}
                            onChange={(e) => setEmployeeID(e.target.value)}
                            className="border p-2 rounded w-full"
                        />
                    </p>
                    <p className="text-lg">
                        <strong>Department:</strong>
                        <input
                            type="text"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="border p-2 rounded w-full"
                        />
                    </p>
                </div>
                <div className="flex justify-between">
                    <div className="w-1/2 p-4">
                        <h2 className="text-2xl font-bold mb-4">Earnings</h2>
                        <table className="min-w-full bg-white border rounded-lg shadow">
                            <tbody>
                                {earnings.map((item, index) => (
                                    <tr key={index} className="border-t">
                                        <td className="px-4 py-2 text-left">{item.description}</td>
                                        <td className="px-4 py-2 text-right">
                                            <input
                                                type="text"
                                                value={item.amount.toFixed(2)}
                                                onChange={(e) => handleEarningsChange(index, e.target.value)}
                                                className="w-full text-right p-2 border rounded"
                                                pattern="[0-9]*" // Allows only numbers to be input
                                            />
                                        </td>
                                    </tr>
                                ))}
                                <tr className="border-t font-bold">
                                    <td className="px-4 py-2 text-left">Total Earnings</td>
                                    <td className="px-4 py-2 text-right">{totalEarnings.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="w-1/2 p-4">
                        <h2 className="text-2xl font-bold mb-4">Deductions</h2>
                        <table className="min-w-full bg-white border rounded-lg shadow">
                            <tbody>
                                {deductions.map((item, index) => (
                                    <tr key={index} className="border-t">
                                        <td className="px-4 py-2 text-left">{item.description}</td>
                                        <td className="px-4 py-2 text-right">
                                            <input
                                                type="text"
                                                value={item.amount.toFixed(2)}
                                                onChange={(e) => handleDeductionsChange(index, e.target.value)}
                                                className="w-full text-right p-2 border rounded"
                                                pattern="[0-9]*" // Allows only numbers to be input
                                            />
                                        </td>
                                    </tr>
                                ))}
                                <tr className="border-t font-bold">
                                    <td className="px-4 py-2 text-left">Total Deductions</td>
                                    <td className="px-4 py-2 text-right">{totalDeductions.toFixed(2)}</td>
                                </tr>
                                <tr className="border-t font-bold">
                                    <td className="px-4 py-2 text-left">Net Pay</td>
                                    <td className="px-4 py-2 text-right">{netPay.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-center mt-6">
                    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                        Download payslip
                    </button>
                </div>
            </main>
        </div>
    );
};

export default SalaryDetails;
