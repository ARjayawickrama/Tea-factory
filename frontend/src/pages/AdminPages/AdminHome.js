import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from '../../components/Navigation_bar/Admin/AdminDashboard ';
function AdminHome() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/'); 
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

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/'); 
    };

    return (
        <div>
            <AdminDashboard />
       
        </div>
    );
}

export default AdminHome;
