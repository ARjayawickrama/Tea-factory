import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Userpages/Home';
import Login from './components/user_management/Login'; 
import Register from './components/user_management/Registration'; 
import AdminHome from './pages/AdminPages/AdminHome'; 
import Maintainingdashboard from './components/Navigation_bar/Admin/Maintainingdashboard/Maintainingdashboard'; 
import SuperviseDashboard from './components/Navigation_bar/Admin/Maintainingdashboard/superviseDashbord'; 
import Equipment from './pages/Userpages/EquipmentPages/Equipment';
import AboutContent from './pages/Userpages/AboutContent';
import Gallery from './pages/Userpages/Gallery';
import EquipmentForm from './components/equipment_maintenance/EquipmentForm';
import EquipmentDisplay from './components/equipment_maintenance/EquipmentDisplay';
import EquipmentUpdate from './components/equipment_maintenance/EquipmentUpdate';
import Usermanagement from './pages/AdminPages/Usermanagement';
import EquipmentCard from './pages/AdminPages/EquipmentMaintenance/EquipmentCard';

import Issue_Maintaining from './pages/AdminPages/EquipmentMaintenance/IssueMaintaining/Issue_Maintaining';
import ScheduleMaintenance from './pages/AdminPages/EquipmentMaintenance/Schedule_Maintenance/ScheduleMaintenance';
import Resources from './pages/AdminPages/EquipmentMaintenance/Resource/Resource';
import MinePayment from './pages/AdminPages/EquipmentMaintenance/MinePayment';
import QualityControllerManeger from './pages/AdminPages/Quality_controller/QualityControllerManeger';
import Quality_supervisor from './pages/AdminPages/Quality_controller/Quality_supervisor';
import Employee_management from './pages/AdminPages/Employee_management/Employee_management';
import Feedback from './pages/AdminPages/Feedback/Feedback';
import FeedbackMainPage from './pages/Userpages/FeedBack/MainPage';
// Uncomment and add imports for the routes below if they exist
// import Inventory_Managment from './pages/AdminPages/Inventory-Managment/Inventory_Managment';
// import Quality_controller from './pages/AdminPages/Quality_controller/Quality_controller';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/AboutContent" element={<AboutContent />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/Maintainingdashboard" element={<Maintainingdashboard />} />
                <Route path="/superviseDashbord" element={<SuperviseDashboard />} />
                <Route path="/usermanagement" element={<Usermanagement />} />
                <Route path="/Gallery" element={<Gallery />} />
                <Route path="/equipment" element={<Equipment />} />
                <Route path="/equipmentform" element={<EquipmentForm />} />
                <Route path="/EquipmentDisplay" element={<EquipmentDisplay />} />
             
                <Route path="/EquipmentUpdate/:id" element={<EquipmentUpdate />} />
                <Route path="/EquipmentCard" element={<EquipmentCard />} />
                <Route path="/Resources" element={<Resources />} />
                <Route path="/MinePayment" element={<MinePayment />} />
                <Route path="/adminhome" element={<AdminHome />} />
                <Route path="/Issue_Maintaining" element={<Issue_Maintaining />} />
                <Route path="/ScheduleMaintenance" element={<ScheduleMaintenance />} />
                <Route path="/QualityControllerManeger" element={<QualityControllerManeger />} /> 
                <Route path="/Quality_supervisor" element={<Quality_supervisor />} /> 
                <Route path="/Employee_management" element={<Employee_management />} /> 
                <Route path="/Feedback" element={<Feedback />} /> 
                <Route path="/FeedbackMainPage" element={<FeedbackMainPage />} /> 
                {/* Uncomment and add routes below if they exist */}
                {/* <Route path="/Inventory_Managment" element={<Inventory_Managment />} /> */}
                {/* <Route path="/Quality_controller" element={<Quality_controller />} /> */}

            </Routes>
        </Router>
    );
}

export default App;
