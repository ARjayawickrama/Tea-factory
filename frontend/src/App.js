import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Userpages/Home';
import Login from './components/user_management/Login'; 
import Register from './components/user_management/Registration'; 
import AdminHome from './pages/AdminPages/AdminHome'; 

import Equipment from './pages/Userpages/EquipmentPages/Equipment';
import AboutContent from './pages/Userpages/AboutContent';
import Gallery from './pages/Userpages/Gallery';
import EquipmentForm from './components/equipment_maintenance/EquipmentForm';
import EquipmentDisplay from './components/equipment_maintenance/EquipmentDisplay';
import EquipmentUpdate from './components/equipment_maintenance/EquipmentUpdate';
import Usermanagement from './pages/AdminPages/Usermanagement';
import EquipmentCard from './pages/AdminPages/EquipmentMaintenance/EquipmentCard';
import EquipmentHome from './pages/AdminPages/EquipmentMaintenance/EquipmentHome';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/AboutContent" element={<AboutContent/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>} />
          
                <Route path="/Gallery" element={<Gallery/>} />
                <Route path="/equipment" element={<Equipment />} />
                <Route path="/equipmentform" element={<EquipmentForm />} />
                <Route path="/EquipmentDisplay" element={<EquipmentDisplay />} />
                <Route path="/EquipmentUpdate/:id" element={<EquipmentUpdate />} />
                <Route path="/EquipmentCard" element={<EquipmentCard />} />
                <Route path="/equipmentmaintenancemanagement" element={<EquipmentHome />} />
                <Route path="/usermanagement" element={<Usermanagement />} />
                <Route path="/adminhome" element={<AdminHome />} />
            </Routes>
        </Router>
    );
}

export default App;
