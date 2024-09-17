import React, { useState, useEffect } from 'react';
import { FaDollarSign, FaUsers } from 'react-icons/fa'; // Importing icons for buttons

const SalaryDetails = () => {
    const [employeeName, setEmployeeName] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const [department, setDepartment] = useState('');

    const [earnings, setEarnings] = useState([
        { description: 'Basic Pay', amount: 0 },
        { description: 'Overtime Allowance', amount: 0 },
        { description: 'Other Allowance', amount: 0 },
    ]);

    const [deductions, setDeductions] = useState([
        { description: 'Loss of Pay', amount: 0 },
        { description: 'Loan Repayment', amount: 0 },
        { description: 'National Insurance', amount: 0 },
        { description: 'Tax', amount: 0 },
        { description: 'EPF', amount: 0 },
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
        <div className="flex h-screen">
            {/* Sidebar */}
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

            {/* Main Content */}
            <main className="ml-30 p-8 w-full">
                <h1 className="text-3xl font-bold mb-6">Salary Details</h1>

                {/* Employee Info */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                    <div>
                        <label className="block text-lg font-semibold mb-1">Employee Name:</label>
                        <input
                            type="text"
                            value={employeeName}
                            onChange={(e) => setEmployeeName(e.target.value)}
                            className="border p-3 rounded w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold mb-1">Employee ID:</label>
                        <input
                            type="text"
                            value={employeeID}
                            onChange={(e) => setEmployeeID(e.target.value)}
                            className="border p-3 rounded w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold mb-1">Department:</label>
                        <input
                            type="text"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="border p-3 rounded w-full"
                        />
                    </div>
                </div>

                {/* Earnings & Deductions */}
                <div className="flex space-x-12">
                    {/* Earnings Table */}
                    <div className="w-1/2">
                        <h2 className="text-xl font-semibold mb-4">Earnings</h2>
                        <table className="min-w-full bg-white border rounded-lg shadow">
                            <tbody>
                                {earnings.map((item, index) => (
                                    <tr key={index} className="border-t">
                                        <td className="px-4 py-2 text-left">{item.description}</td>
                                        <td className="px-4 py-2 text-right">
                                            <input
                                                type="number"
                                                value={item.amount.toFixed(2)}
                                                onChange={(e) => handleEarningsChange(index, e.target.value)}
                                                className="w-full text-right p-2 border rounded"
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

                    {/* Deductions Table */}
                    <div className="w-1/2">
                        <h2 className="text-xl font-semibold mb-4">Deductions</h2>
                        <table className="min-w-full bg-white border rounded-lg shadow">
                            <tbody>
                                {deductions.map((item, index) => (
                                    <tr key={index} className="border-t">
                                        <td className="px-4 py-2 text-left">{item.description}</td>
                                        <td className="px-4 py-2 text-right">
                                            <input
                                                type="number"
                                                value={item.amount.toFixed(2)}
                                                onChange={(e) => handleDeductionsChange(index, e.target.value)}
                                                className="w-full text-right p-2 border rounded"
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

                {/* Download Button */}
                <div className="mt-8 text-right">
                    <button className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg">
                        Download Payslip
                    </button>
                </div>
            </main>
        </div>
    );
};

export default SalaryDetails;
