import React, { useState, useEffect } from 'react';
import { FaUsers } from 'react-icons/fa';
import axios from 'axios';
import Quality_Charts from '../Quality_controller/Quality_Charts';

export default function QualityControllerManager() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [error, setError] = useState(null);
    const [teaVarieties, setTeaVarieties] = useState([]);
    const [editMode, setEditMode] = useState(null); // Track which row is being edited
    const [formData, setFormData] = useState({ typeOfTea: '', teaGrade: '', flavor: '', date: '', color: '', note: '' });

    useEffect(() => {
        const fetchTeaVarieties = async () => {
            try {
                const response = await axios.get('http://localhost:5004/QualityController');
                setTeaVarieties(response.data.qualityControls || []);
            } catch (err) {
                setError(`Failed to fetch data. ${err.response ? err.response.data.message : err.message}`);
            }
        };
        fetchTeaVarieties();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEditClick = (tea) => {
        setEditMode(tea._id);
        setFormData(tea);
    };

    const handleCancelClick = () => {
        setEditMode(null);
        setFormData({ typeOfTea: '', teaGrade: '', flavor: '', date: '', color: '', note: '' });
    };

    const handleSaveClick = async () => {
        if (!editMode) return; // Exit if no item is being edited
        try {
            const response = await axios.put(`http://localhost:5004/QualityController/${editMode}`, formData);
            setTeaVarieties(teaVarieties.map(tea => tea._id === editMode ? response.data.qualityControl : tea));
            setEditMode(null);
            setFormData({ typeOfTea: '', teaGrade: '', flavor: '', date: '', color: '', note: '' });
        } catch (err) {
            setError(`Failed to update data. ${err.response ? err.response.data.message : err.message}`);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5004/QualityController/${id}`);
            setTeaVarieties(teaVarieties.filter(tea => tea._id !== id));
        } catch (err) {
            setError(`Failed to delete item. ${err.response ? err.response.data.message : err.message}`);
        }
    };

    return (
        <div className="flex">
            <div
                className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
                }`}
            >
                <nav>
                    <ul>
                        <li className="p-4 cursor-pointer bg-amber-500 mt-40 flex items-center">
                            <FaUsers className="w-8 h-8 mr-4" />
                            <span>Quality Controller Manager</span>
                        </li>
                        <a href='/Quality_supervisor' className="p-4 cursor-pointer bg-amber-500 mt-20 flex items-center">
                            <FaUsers className="w-8 h-8 mr-4" />
                            <span>Quality Supervisor</span>
                        </a>
                    </ul>
                </nav>
            </div>

            <main className={`ml-64 p-4 flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
                {error && <div className="text-red-500 mt-4">{error}</div>}
                <Quality_Charts />
                <table className="w-full border-collapse border border-gray-200 mt-11">
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
                        {teaVarieties.map((tea) => (
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
                                                value={formData.date ? formData.date.split('T')[0] : ''}
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
                                            <textarea
                                                name="note"
                                                value={formData.note}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 p-1 rounded"
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <button
                                                onClick={handleSaveClick}
                                                className="bg-green-500 text-white p-1 rounded mr-2"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancelClick}
                                                className="bg-gray-500 text-white p-1 rounded"
                                            >
                                                Cancel
                                            </button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="border border-gray-300 p-2">{tea.typeOfTea}</td>
                                        <td className="border border-gray-300 p-2">{tea.teaGrade}</td>
                                        <td className="border border-gray-300 p-2">{tea.flavor}</td>
                                        <td className="border border-gray-300 p-2">{tea.date ? tea.date.split('T')[0] : ''}</td>
                                        <td className="border border-gray-300 p-2">{tea.color}</td>
                                        <td className="border border-gray-300 p-2">{tea.note}</td>
                                        <td className="border border-gray-300 p-2">
                                            <button
                                                onClick={() => handleEditClick(tea)}
                                                className="bg-yellow-600 text-white p-1 rounded mr-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(tea._id)}
                                                className="bg-red-500 text-white p-1 rounded"
                                            >
                                                Delete
                                            </button>
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
