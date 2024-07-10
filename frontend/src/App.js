import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Userpages/Home';
import Login from './components/user_management/Login';
import Register from './components/user_management/Registration';
import AdminHome from './pages/AdminPages/AdminHome';
import UserHome from './pages/Userpages/Home';
import UsersList from './pages/AdminPages/Usermanagement';

import Usermanagement from './pages/AdminPages/Usermanagement';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/UsersList" element={<UsersList />} />
                <Route path="/usermanagement" element={<Usermanagement />} />
                <Route path="/adminhome" element={<AdminHome />} />
                <Route path="/userhome" element={<UserHome />} />
            </Routes>
        </Router>
    );
}

export default App;
