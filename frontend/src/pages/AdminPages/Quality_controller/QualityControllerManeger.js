import React, { useState, useEffect } from 'react';
import { FaUsers } from 'react-icons/fa';
import axios from 'axios';

export default function QualityControllerManager() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [error, setError] = useState(null);
    const [teaVarieties, setTeaVarieties] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [formData, setFormData] = useState({ typeOfTea: '', teaGrade: '', flavor: '', date: '', color: '', note: '' });

    useEffect(() => {
        // Fetch initial data
        const fetchTeaVarieties = async () => {
            try {
                const response = await axios.get('http://localhost:5004/QualityController');
                setTeaVarieties(response.data.qualityControls);
            } catch (err) {
                setError(`Failed to fetch data. ${err.response ? err.response.data.message : err.message}`);
            }
        };
        fetchTeaVarieties();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setFormData(teaVarieties[index]);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5004/QualityController/${id}`);
            setTeaVarieties(teaVarieties.filter(tea => tea.id !== id));
        } catch (err) {
            setError(`Failed to delete item. ${err.response ? err.response.data.message : err.message}`);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingIndex !== null) {
                // Update existing tea
                const response = await axios.put(`http://localhost:5004/QualityController/${teaVarieties[editingIndex].id}`, formData);
                const updatedTeaVarieties = [...teaVarieties];
                updatedTeaVarieties[editingIndex] = response.data;
                setTeaVarieties(updatedTeaVarieties);
                setEditingIndex(null);
            } else {
                // Add new tea
                const response = await axios.post('http://localhost:5004/QualityController', formData);
                setTeaVarieties([...teaVarieties, response.data]);
            }
            setFormData({ typeOfTea: '', teaGrade: '', flavor: '', date: '', color: '', note: '' });
        } catch (err) {
            setError(`Failed to save data. ${err.response ? err.response.data.message : err.message}`);
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
                        <li className="p-4 cursor-pointer bg-teal-500 mt-40 flex items-center">
                            <FaUsers className="w-8 h-8 mr-4" />
                            <span>Quality Controller Manager nmnsmcnmnsmcnzmxc</span>
                        </li>
                    </ul>
                </nav>
            </div>

            <main className="ml-64 p-4 flex-1">
                <form onSubmit={handleSubmit} className="mb-4">
                    <input
                        type="text"
                        name="typeOfTea"
                        value={formData.typeOfTea}
                        onChange={handleInputChange}
                        placeholder="Type of Tea"
                        required
                        className="block mb-2 p-2 border"
                    />
                    <input
                        type="text"
                        name="teaGrade"
                        value={formData.teaGrade}
                        onChange={handleInputChange}
                        placeholder="Tea Grade"
                        required
                        className="block mb-2 p-2 border"
                    />
                    <input
                        type="text"
                        name="flavor"
                        value={formData.flavor}
                        onChange={handleInputChange}
                        placeholder="Flavor"
                        required
                        className="block mb-2 p-2 border"
                    />
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        className="block mb-2 p-2 border"
                    />
                    <input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                        placeholder="Color"
                        required
                        className="block mb-2 p-2 border"
                    />
                    <textarea
                        name="note"
                        value={formData.note}
                        onChange={handleInputChange}
                        placeholder="Note"
                        className="block mb-2 p-2 border"
                    />
                    <button type="submit" className="p-2 bg-blue-500 text-white">Submit</button>
                </form>

                {error && <div className="text-red-500 mt-4">{error}</div>}

                <table className="w-full border-collapse border border-gray-200">
                    <thead>
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
                        {teaVarieties.map((tea, index) => (
                            <tr key={tea.id}>
                                <td className="border border-gray-300 p-2">{tea.typeOfTea}</td>
                                <td className="border border-gray-300 p-2">{tea.teaGrade}</td>
                                <td className="border border-gray-300 p-2">{tea.flavor}</td>
                                <td className="border border-gray-300 p-2">{tea.date}</td>
                                <td className="border border-gray-300 p-2">{tea.color}</td>
                                <td className="border border-gray-300 p-2">{tea.note}</td>
                                <td className="border border-gray-300 p-2">
                                    <button onClick={() => handleEdit(index)} className="bg-yellow-500 text-white p-1 mr-2">Edit</button>
                                    <button onClick={() => handleDelete(tea.id)} className="bg-red-500 text-white p-1">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
}
