import React, { useState } from 'react';
import { FaUsers } from 'react-icons/fa';

export default function QualityControllerManager() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
    const [error, setError] = useState(null);
    const [teaVarieties, setTeaVarieties] = useState([
        { id: 1, type: 'Green Tea', grade: 'A', flavor: 'Mint', date: '2023-08-20', color: 'Light Green', note: 'Fresh' },
        { id: 2, type: 'Black Tea', grade: 'B', flavor: 'Bergamot', date: '2023-08-21', color: 'Dark Brown', note: 'Strong' },
    ]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [formData, setFormData] = useState({ type: '', grade: '', flavor: '', date: '', color: '', note: '' });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setFormData(teaVarieties[index]);
    };

    const handleDelete = (index) => {
        const updatedTeaVarieties = teaVarieties.filter((_, i) => i !== index);
        setTeaVarieties(updatedTeaVarieties);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingIndex !== null) {
            const updatedTeaVarieties = [...teaVarieties];
            updatedTeaVarieties[editingIndex] = formData;
            setTeaVarieties(updatedTeaVarieties);
            setEditingIndex(null);
        } else {
            setTeaVarieties([...teaVarieties, { id: teaVarieties.length + 1, ...formData }]);
        }
        setFormData({ type: '', grade: '', flavor: '', date: '', color: '', note: '' });
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
                            <span> Quality Controller Manager</span>
                        </li>
                    </ul>
                </nav>
            </div>

            <main
                className={`flex-1 p-6 transition-transform duration-300 ${
                    isSidebarOpen ? 'ml-64' : 'ml-0'
                }`}
            >
                

                <h2 className="mt-8 text-xl font-semibold">Tea Varieties</h2>
                <table className="w-full mt-4 border border-gray-200">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2">Type</th>
                            <th className="p-2">Grade</th>
                            <th className="p-2">Flavor</th>
                            <th className="p-2">Date</th>
                            <th className="p-2">Color</th>
                            <th className="p-2">Note</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teaVarieties.map((tea, index) => (
                            <tr key={tea.id} className="border-t border-gray-200">
                                <td className="p-2">{tea.type}</td>
                                <td className="p-2">{tea.grade}</td>
                                <td className="p-2">{tea.flavor}</td>
                                <td className="p-2">{tea.date}</td>
                                <td className="p-2">{tea.color}</td>
                                <td className="p-2">{tea.note}</td>
                                <td className="p-2 flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(index)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {error && <div className="text-red-500 mt-4">{error}</div>}
            </main>
        </div>
    );
}
