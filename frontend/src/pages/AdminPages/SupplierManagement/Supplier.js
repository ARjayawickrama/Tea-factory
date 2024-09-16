import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Supplier() {
    const navigate = useNavigate(); // Use the navigate hook for page navigation

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="fixed top-0 left-0 h-full bg-stone-800 text-white w-64">
                <nav>
                    <ul>
                        <li className="p-4 cursor-pointer bg-teal-500 mt-40 flex items-center">
                            <span>Supplier Manager</span>
                        </li>
                        <li className="p-4 cursor-pointer bg-teal-500 mt-4 flex items-center">
                            <span>Financial Manager</span>
                        </li>
                        <li className="p-4 cursor-pointer bg-teal-500 mt-4 flex items-center">
                            <span>Inventory Manager</span>
                        </li>
                        <li className="p-4 cursor-pointer bg-teal-500 mt-4 flex items-center">
                            <span>Quality Control</span>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <main className="ml-64 p-4 flex-1">
                <h1>Management Dashboard</h1>

                {/* Buttons for Financial, Inventory, and Quality Control */}
                <div className="mt-6">
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded mr-4"
                        onClick={() => alert('Navigating to Financial Manager')}>
                        Financial Manager
                    </button>
                    <button
                        className="bg-green-500 text-white py-2 px-4 rounded mr-4"
                        onClick={() => alert('Navigating to Inventory Manager')}>
                        Inventory Manager
                    </button>
                    <button
                        className="bg-purple-500 text-white py-2 px-4 rounded mr-4"
                        onClick={() => alert('Navigating to Quality Control')}>
                        Quality Control
                    </button>

                    {/* Navigate to Supplier Details Page */}
                    <button
                        className="bg-teal-500 text-white py-2 px-4 rounded"
                        onClick={() => navigate('/supplier_form')}>
                        Supplier Details
                    </button>
                </div>
            </main>
        </div>
    );
}
