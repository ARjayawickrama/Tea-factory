// Button.js
import React from 'react';

// Define a Button component that accepts props
const Button = ({ onClick, text, className }) => {
    return (
        <button onClick={onClick} className={`p-2 rounded ${className}`}>
            {text}
        </button>
    );
};

// Define a ButtonGroup component to render the buttons together
export const ButtonGroup = ({ generatePDF, resetFields, saveSalaryData }) => {
    return (
        <div className="flex space-x-4">
            <Button onClick={generatePDF} text="Download PDF" className="bg-blue-500 text-white" />
            <Button onClick={resetFields} text="Reset" className="bg-gray-300 text-black" />
            <Button onClick={saveSalaryData} text="Save Salary Data" className="bg-green-500 text-white" />
        </div>
    );
};

export default Button;
