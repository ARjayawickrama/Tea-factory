import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminDashboard from '../../components/Navigation_bar/Admin/AdminDashboard ';
import { FaUser } from 'react-icons/fa6';
import { FaUsers } from "react-icons/fa6";

function AdminHome() {
    const [users, setUsers] = useState([]);
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
        } catch (error) {
            console.error('Error fetching users:', error.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div >
            <AdminDashboard />
            <div  className='inline-flex  absolute  right-32'>

                <div className=' p-6'>
                <div className="bg-white p-4 rounded-lg shadow text-center flex flex-col items-center justify-center w-44 h-28 sm:w-60 sm:h-40 md:w-72 md:h-48 ">
                        <FaUsers className="text-yellow-500 text-3xl mb-2 w-10" />
                        <a href='/Usermanagement' className="text-2xl font-bold">Total Users: {users.length}</a>
                        <p className="text-gray-500">Welcome</p>
                
                    </div>
             
                </div>

                <div className=' p-6' >
                <div className="bg-white p-4 rounded-lg shadow text-center flex flex-col items-center justify-center w-48 h-32 sm:w-60 sm:h-40 md:w-72 md:h-48">
                        <FaUser className="text-yellow-500 text-3xl mb-2" />
                        <p className="text-2xl font-bold">Total Orders</p>
                        <p className="text-gray-500">Welcome</p>
                
                    </div>
             
                </div>

                <div className=' p-6'>

                <div className="bg-white p-4 rounded-lg shadow text-center flex flex-col items-center justify-center w-48 h-32 sm:w-60 sm:h-40 md:w-72 md:h-48">
                        <FaUser className="text-yellow-500 text-3xl mb-2" />
                        <p className="text-2xl font-bold">Total Users: {users.length}</p>
                        <p className="text-gray-500">Welcome</p>
                
                    </div>
             
                </div>

            </div>



        </div>
    );
}

export default AdminHome;
