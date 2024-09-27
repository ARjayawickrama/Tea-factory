import React, { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function EmCalculation() {
    const location = useLocation();
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
    const [errorMessage, setErrorMessage] = useState('');
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

    const handleEarningsChange = (index, value) => {
        const numericValue = parseFloat(value);
        if (numericValue < 0) {
            setErrorMessage('Please enter a positive amount.');
            return;
        }
        setErrorMessage('');

        const updatedEarnings = earnings.map((item, i) =>
            i === index ? { ...item, amount: value } : item
        );
        setEarnings(updatedEarnings);
    };

    const handleDeductionsChange = (index, value) => {
        const numericValue = parseFloat(value);
        if (numericValue < 0) {
            setErrorMessage('Please enter a positive amount.');
            return;
        }
        setErrorMessage('');

        const updatedDeductions = deductions.map((item, i) =>
            i === index ? { ...item, amount: value } : item
        );
        setDeductions(updatedDeductions);
    };

    const generatePDF = () => {
        const input = salaryRef.current;
        const scale = 2;
        html2canvas(input, { scale }).then((canvas) => {
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

            pdf.save('salary-details.pdf');
        });
    };

    const resetFields = () => {
        setEarnings([
            { description: 'Basic Pay', amount: '' },
            { description: 'Overtime Allowance', amount: '' },
            { description: 'Other Allowance', amount: '' },
        ]);
        setDeductions([
            { description: 'Loss of Pay', amount: '' },
            { description: 'Loan Repayment', amount: '' },
            { description: 'National Insurance', amount: '' },
            { description: 'Tax', amount: '' },
            { description: 'EPF', amount: '' },
        ]);
        setErrorMessage('');
    };

    const validateInputs = () => {
        const invalidEarnings = earnings.some(item => parseFloat(item.amount) < 0);
        const invalidDeductions = deductions.some(item => parseFloat(item.amount) < 0);

        if (invalidEarnings || invalidDeductions) {
            setErrorMessage('Please enter valid positive amounts.');
            return false;
        }

        setErrorMessage('');
        return true;
    };

    const saveSalaryData = async () => {
        if (!validateInputs()) return;

        const salaryData = {
            totalEarnings,
            totalDeductions,
            netPay,
            earnings,
            deductions
        };

        try {
            const response = await axios.post('http://localhost:5004/SalaryDetails', salaryData);
            if (response.status === 201 || response.status === 200) {
                alert('Salary data saved successfully!');
            } else {
                alert('Failed to save salary data.');
            }
        } catch (error) {
            console.error('Error saving salary data:', error);
            setErrorMessage('Error saving salary data. Please try again later.');
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
                    <td className="px-4 py-2">{isEarnings ? 'Total Earnings' : 'Total Deductions'}</td>
                    <td className="px-4 py-2 text-right">{formatNumber(isEarnings ? totalEarnings : totalDeductions)}</td>
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
            <div className="flex space-x-4">
                <button onClick={generatePDF} className="bg-blue-500 text-white p-2 rounded">Download PDF</button>
                <button onClick={resetFields} className="bg-gray-300 text-black p-2 rounded">Reset</button>
                <button onClick={saveSalaryData} className="bg-green-500 text-white p-2 rounded">Save Salary Data</button>
            </div>
        </div>
    );
}