import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Userpages/Home'; // Adjusted relative path
import Login from './components/user_management/Login'; // Adjusted relative path
import Register from './components/user_management/Registration'; // Adjusted relative path
import AdminHome from './pages/AdminPages/AdminHome'; // Adjusted relative path
import UserHome from './UserHome'; // Adjusted relative path
import UsersList from './UsersList';
import Equipment from './pages/Userpages/Equipment'; // Adjusted relative path
import Usermanagement from './pages/AdminPages/Usermanagement'; //

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>} />
                <Route path="/UsersList" element={<UsersList/>} />
                <Route path="/equipment" element={<Equipment />} />
                <Route path="/usermanagement" element={<Usermanagement />} />
                <Route path="/adminhome" element={<AdminHome />} />
                <Route path="/userhome" element={<UserHome />} />
            </Routes>
        </Router>
    );
}

export default App;
