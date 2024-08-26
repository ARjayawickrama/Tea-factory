import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Attendance = () => {
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
            })
            .catch(error => console.error('Error adding attendance:', error));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Employee Attendance</h1>
            <form onSubmit={handleSubmit} className="mb-6">
                <input
                    type="text"
                    placeholder="Employee ID"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="border p-2 rounded w-full mb-2"
                    required
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border p-2 rounded w-full mb-2"
                    required
                />
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border p-2 rounded w-full mb-4"
                    required
                >
                    <option value="">Select Status</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    
                </select>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Attendance
                </button>
            </form>
            <h2 className="text-xl font-bold mb-4">Attendance Records</h2>
            <ul>
                {attendanceData.map((record, index) => (
                    <li key={index} className="border-b py-2">
                        {record.employeeId} - {record.date} - {record.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Attendance;
