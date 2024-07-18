import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminDashboard from '../../components/Navigation_bar/Admin/AdminDashboard ';
import { FaUser, FaUsers } from 'react-icons/fa';

function AdminHome() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        } else {
            fetchUsers();
        }

        const handlePopState = () => {
            navigate('/', { replace: true });
            window.history.pushState(null, null, '/');
        };

        window.history.pushState(null, null, '/');
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigate]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5004/api/users');
            setUsers(response.data);
            setError(null); // Reset error state on success
        } catch (error) {
            console.error('Error fetching users:', error.message);
            setError('Error fetching data. Please try again later.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }} className=' bg-slate-100'>
   
            <AdminDashboard />
            {error ? (
                <div className="text-red-500 text-center  ">{error}</div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-6 gap-3  right-32 relative left-28 '>
                    <div className='bg-white p-3 rounded-lg shadow text-center flex flex-col items-center justify-center w-full h-28 sm:h-11 md:h-36'>
                        <FaUsers className="text-yellow-500 text-3xl mb-2" />
                        <a href='/Usermanagement' className="text-2xl font-bold">Total Users: {users.length}</a>
                        <p className="text-gray-500">Welcome</p>
                    </div>

                    <div className='bg-white p-2 rounded-lg shadow text-center flex flex-col items-center justify-center w-full h-28 sm:h-40 md:h-36'>
                        <FaUser className="text-yellow-500 text-3xl mb-2" />
                        <p className="text-2xl font-bold">Total Orders</p>
                        <p className="text-gray-500">Welcome</p>
                    </div>

                    <div className='bg-white p-2 rounded-lg shadow text-center flex flex-col items-center justify-center w-full h-28 sm:h-40 md:h-36'>
                        <FaUser className="text-yellow-500 text-3xl mb-2" />
                        <p className="text-2xl font-bold">Total Users: {users.length}</p>
                        <p className="text-gray-500">Welcome</p>
                    </div>

                    <div className='bg-white p-2 rounded-lg shadow text-center flex flex-col items-center justify-center w-full h-28 sm:h-40 md:h-36'>
                        <FaUser className="text-yellow-500 text-3xl mb-2" />
                        <p className="text-2xl font-bold">Total Users: {users.length}</p>
                        <p className="text-gray-500">Welcome</p>
                    </div>

                    <div className='bg-white p-2 rounded-lg shadow text-center flex flex-col items-center justify-center w-full h-28 sm:h-40 md:h-36'>
                        <FaUser className="text-yellow-500 text-3xl mb-2" />
                        <p className="text-2xl font-bold">Total Users: {users.length}</p>
                        <p className="text-gray-500">Welcome</p>
                        
                    </div>

                    <div className='bg-white p-2 rounded-lg shadow text-center flex flex-col items-center justify-center w-full h-28 sm:h-40 md:h-36'>
                        <FaUser className="text-yellow-500 text-3xl mb-2" />
                        <p className="text-2xl font-bold">Total Users: {users.length}</p>
                        <p className="text-gray-500">Welcome</p>
                        
                    </div>

                   
                    
                    
                </div>
                
            )}
       
        </Box>
    );
}

export default AdminHome;
