import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Userspages/Home';
import Login from './components/user_management/Login'; 
import Register from './components/user_management/Registration'; 
import AdminHome from './pages/AdminPages/AdminHome'; 
import UserHome from './UserHome';
import About from './pages/Userspages/About';
import UsersList from './UsersList';
import Equipment from './pages/Userspages/EquipmentPages/Equipment';

import EquipmentForm from './components/equipment_maintenance/EquipmentForm';
import EquipmentDisplay from './components/equipment_maintenance/EquipmentDisplay';
import EquipmentUpdate from './components/equipment_maintenance/EquipmentUpdate';
import Usermanagement from './pages/AdminPages/Usermanagement';
import Equipment_Maintenance_Management from './pages/AdminPages/EquipmentMaintenanceManagement';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>} />
                <Route path="/UsersList" element={<UsersList/>} />
                <Route path="/about" element={<About />} />
                <Route path="/equipment" element={<Equipment />} />
                <Route path="/equipmentform" element={<EquipmentForm />} />
                <Route path="/EquipmentDisplay" element={<EquipmentDisplay />} />
                <Route path="/EquipmentUpdate/:id" element={<EquipmentUpdate />} />
                <Route path="/equipmentmaintenancemanagement" element={<Equipment_Maintenance_Management />} />
                <Route path="/usermanagement" element={<Usermanagement />} />
                <Route path="/adminhome" element={<AdminHome />} />
                <Route path="/userhome" element={<UserHome />} />
            </Routes>
        </Router>
    );
}

export default App;
