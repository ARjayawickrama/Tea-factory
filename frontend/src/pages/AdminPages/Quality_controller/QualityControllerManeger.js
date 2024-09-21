import React, { useState, useEffect } from 'react';
import { FaUsers } from 'react-icons/fa';
import axios from 'axios';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
} from 'recharts';
import QulatiIsusInfrom from "../../../pages/AdminPages/Quality_controller/QulatiIsusInfrom";
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin for jsPDF

export default function QualityControllerManager() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [error, setError] = useState(null);
    const [teaVarieties, setTeaVarieties] = useState([]);
    const [filteredTeaVarieties, setFilteredTeaVarieties] = useState([]);
    const [editMode, setEditMode] = useState(null);
    const [formData, setFormData] = useState({
        typeOfTea: '',
        teaGrade: '',
        flavor: '',
        date: '',
        color: '',
        note: '',
    });
    const [selectedMonth, setSelectedMonth] = useState('');

    // Fetch tea varieties on component mount
    useEffect(() => {
        const fetchTeaVarieties = async () => {
            try {
                const response = await axios.get('http://localhost:5004/QualityController');
                setTeaVarieties(response.data.qualityControls || []);
                setFilteredTeaVarieties(response.data.qualityControls || []);
            } catch (err) {
                setError(`Failed to fetch data. ${err.response ? err.response.data.message : err.message}`);
            }
        };
        fetchTeaVarieties();
    }, []);

    // Handle input changes for form data
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle editing a tea variety
    const handleEditClick = (tea) => {
        setEditMode(tea._id);
        setFormData(tea);
    };

    // Cancel edit mode
    const handleCancelClick = () => {
        setEditMode(null);
        setFormData({
            typeOfTea: '',
            teaGrade: '',
            flavor: '',
            date: '',
            color: '',
            note: '',
        });
    };

    // Save edited tea variety
    const handleSaveClick = async () => {
        if (!editMode) return;
        try {
            const response = await axios.put(`http://localhost:5004/QualityController/${editMode}`, formData);
            setTeaVarieties(teaVarieties.map((tea) => (tea._id === editMode ? response.data.qualityControl : tea)));
            setEditMode(null);
            setFormData({
                typeOfTea: '',
                teaGrade: '',
                flavor: '',
                date: '',
                color: '',
                note: '',
            });
        } catch (err) {
            setError(`Failed to update data. ${err.response ? err.response.data.message : err.message}`);
        }
    };

    // Delete a tea variety
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await axios.delete(`http://localhost:5004/QualityController/${id}`);
                setTeaVarieties(teaVarieties.filter((tea) => tea._id !== id));
            } catch (err) {
                setError(`Failed to delete item. ${err.response ? err.response.data.message : err.message}`);
            }
        }
    };

    // Filter tea varieties by selected month
    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
        const filtered = teaVarieties.filter(tea => {
            const teaDate = new Date(tea.date);
            return teaDate.getMonth() === parseInt(e.target.value);
        });
        setFilteredTeaVarieties(filtered);
    };

    // Prepare data for Pie Chart and Bar Chart
    const pieData = (selectedMonth ? filteredTeaVarieties : teaVarieties).reduce((acc, tea) => {
        const key = `${tea.typeOfTea} - ${tea.teaGrade} - ${tea.flavor}`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});

    const barChartData = Object.keys(pieData).map((key) => ({
        label: key,
        value: pieData[key],
    }));

    // Download PDF report
    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text("Quality Controller Report", 14, 16);
        doc.autoTable({
            head: [['Type of Tea', 'Tea Grade', 'Flavor', 'Date', 'Color', 'Note']],
            body: (selectedMonth ? filteredTeaVarieties : teaVarieties).map(tea => [
                tea.typeOfTea,
                tea.teaGrade,
                tea.flavor,
                new Date(tea.date).toLocaleDateString(),
                tea.color,
                tea.note,
            ]),
        });
        doc.save('Quality_Controller_Report.pdf');
    };

    return (
        <div className="flex">
            <div
                className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}
            >
                <nav>
                    <ul>
                        <li className="p-4 cursor-pointer bg-amber-500 mt-40 flex items-center">
                            <FaUsers className="w-8 h-8 mr-4" />
                            <span>Quality Controller Manager</span>
                        </li>
                        <a href="/Quality_supervisor" className="p-4 cursor-pointer bg-amber-500 mt-20 flex items-center">
                            <FaUsers className="w-8 h-8 mr-4" />
                            <span>Quality Supervisor</span>
                        </a>
                    </ul>
                </nav>
            </div>

            <main className={`ml-64 p-4 flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
                <QulatiIsusInfrom />
                {error && <div className="text-red-500 mt-4">{error}</div>}
                
                {/* Month Filter */}
                <div className="mb-4">
                    <label htmlFor="month" className="mr-2">Filter by Month:</label>
                    <select 
                        id="month" 
                        value={selectedMonth} 
                        onChange={handleMonthChange} 
                        className="border border-gray-300 p-1 rounded"
                    >
                        <option value="">Select Month</option>
                        {[...Array(12)].map((_, index) => (
                            <option key={index} value={index}>{new Date(0, index).toLocaleString('default', { month: 'long' })}</option>
                        ))}
                    </select>
                </div>

                {/* Bar Chart */}
                {barChartData.length > 0 ? (
                    <div className="flex mb-4">
                        <BarChart width={750} height={400} data={barChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="label" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#82ca9d" />
                        </BarChart>
                    </div>
                ) : (
                    <div className="flex justify-center mb-4">No data available for the Bar Chart</div>
                )}

                <button onClick={downloadPDF} className="bg-green-800 text-white px-4 py-2 rounded">Download PDF</button>

                {/* Tea Varieties Table */}
                <table className="w-full border-collapse border border-gray-200 mt-2">
                    <thead className="bg-green-800 text-white font-bold">
                        <tr>
                            <th className="border border-gray-300 p-2">Type of Tea</th>
                            <th className="border border-gray-300 p-2">Tea Grade</th>
                            <th className="border border-gray-300 p-2">Flavor</th>
                            <th className="border border-gray-300 p-2">Date</th>
                            <th className="border border-gray-300 p-2">Color</th>
                            <th className="border border-gray-300 p-2">Note</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(selectedMonth ? filteredTeaVarieties : teaVarieties).map((tea) => (
                            <tr key={tea._id}>
                                {editMode === tea._id ? (
                                    <>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                name="typeOfTea"
                                                value={formData.typeOfTea}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 p-1 rounded"
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                name="teaGrade"
                                                value={formData.teaGrade}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 p-1 rounded"
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                name="flavor"
                                                value={formData.flavor}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 p-1 rounded"
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="date"
                                                name="date"
                                                value={formData.date.split('T')[0]}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 p-1 rounded"
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                name="color"
                                                value={formData.color}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 p-1 rounded"
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                name="note"
                                                value={formData.note}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 p-1 rounded"
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <button onClick={handleSaveClick} className="bg-yellow-600 text-white px-2 py-1 rounded">Save</button>
                                            <button onClick={handleCancelClick} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="border border-gray-300 p-2">{tea.typeOfTea}</td>
                                        <td className="border border-gray-300 p-2">{tea.teaGrade}</td>
                                        <td className="border border-gray-300 p-2">{tea.flavor}</td>
                                        <td className="border border-gray-300 p-2">{new Date(tea.date).toLocaleDateString()}</td>
                                        <td className="border border-gray-300 p-2">{tea.color}</td>
                                        <td className="border border-gray-300 p-2">{tea.note}</td>
                                        <td className="border border-gray-300 p-2">
                                            <button onClick={() => handleEditClick(tea)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                                            <button onClick={() => handleDelete(tea._id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
}
