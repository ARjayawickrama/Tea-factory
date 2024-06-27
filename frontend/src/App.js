import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Userpages/Home'; 
import Login from './components/user_management/Login'; 
import Register from './components/user_management/Registration'; 
import AdminHome from './pages/AdminPages/AdminHome'; 
import Usermanagement from './pages/AdminPages/Usermanagement'; 
import Equipment from './pages/Userpages/Equipment';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>} />
                <Route path="/equipment" element={<Equipment />} />
                <Route path="/usermanagement" element={<Usermanagement />} />
                <Route path="/adminhome" element={<AdminHome />} />
               
            </Routes>
        </Router>
    );
}

export default App;
