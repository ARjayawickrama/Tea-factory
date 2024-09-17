import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUsers, FaCalendarCheck } from 'react-icons/fa';

const Attendance = ({ onAttendanceUpdate }) => { // Pass a prop for attendance update callback
    const [attendanceData, setAttendanceData] = useState([]);
    const [employeeId, setEmployeeId] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/attendance')
            .then(response => setAttendanceData(response.data))
            .catch(error => console.error('Error fetching attendance data:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newAttendance = { employeeId, date, status };

        axios.post('http://localhost:5000/attendance', newAttendance)
            .then(response => {
                setAttendanceData([...attendanceData, newAttendance]);
                setEmployeeId('');
                setDate('');
                setStatus('');
                // Notify employee list to update
                if (onAttendanceUpdate) {
                    onAttendanceUpdate();
                }
            })
            .catch(error => console.error('Error adding attendance:', error));
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="fixed top-0 left-0 h-full bg-stone-800 text-white w-64">
                <nav>
                    <ul>
                        <li className="p-4 mt-9 flex items-center">
                            <button className="w-full flex items-center bg-amber-500 p-4 rounded">
                                <FaUsers className="w-8 h-8 mr-4" />
                                <span>Employee Management</span>
                            </button>
                        </li>
                        <li className="p-4 mt-9 flex items-center">
                            <button className="w-full flex items-center bg-amber-500 p-4 rounded">
                                <FaCalendarCheck className="w-8 h-8 mr-4" />
                                <span>Attendance</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <main className="relative left-64 flex-grow p-12 max-w-3xl">
                <h1 className="text-3xl font-bold mb-6">Employee Attendance</h1>
                <form onSubmit={handleSubmit} className="mb-8">
                    <input
                        type="text"
                        placeholder="Employee ID"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        className="border p-3 rounded w-full mb-4"
                        required
                    />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="border p-3 rounded w-full mb-4"
                        required
                    />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border p-3 rounded w-full mb-6"
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                    </select>

                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                        Add Attendance
                    </button>
                </form>

                <ul>
                    {attendanceData.map((record, index) => (
                        <li key={index} className="border-b py-3">
                            {record.employeeId} - {record.date} - {record.status}
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
};

export default Attendance;
