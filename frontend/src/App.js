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
// import EmployeeManagement from './pages/AdminPages/Employee_management/EmployeeManagement';
import ScheduleMaintenanceshow from './pages/AdminPages/EquipmentMaintenance/Schedule_Maintenance/ScheduleMaintenance';
import Issue_Maintaining from './pages/AdminPages/EquipmentMaintenance/IssueMaintaining/Issue_Maintaining';
import Quality_controller from './pages/AdminPages/Quality_controller/Quality_supervisor';
import QualityControllerManeger from './pages/AdminPages/Quality_controller/QualityControllerManeger';
import F_Employee from './pages/AdminPages/FinancialManagement/F_Employee';
import FinancialManagement from './pages/AdminPages/FinancialManagement/FinancialManagement';
import Pay from './pages/AdminPages/FinancialManagement/pay';
// import Resources from './pages/AdminPages/EquipmentMaintenance/Resource/Resource';
import MinePayment from './pages/AdminPages/EquipmentMaintenance/MinePayment';

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
                <Route path="/ScheduleMaintenanceshow" element={<ScheduleMaintenanceshow />} />
                <Route path="/issue_Maintaining" element={<Issue_Maintaining />} />
                {/* <Route path="/Resources" element={<Resources />} /> */}
                <Route path="/MinePayment" element={<MinePayment />} />
                <Route path="/adminhome" element={<AdminHome />} />
                <Route path="/FinancialManagement" element={<FinancialManagement />} />
                  <Route path="/employee" element={<F_Employee />} />
                  <Route path="/pay" element={<Pay />} />
                <Route path="/Quality_controller" element={<Quality_controller />} />
                <Route path="/QualityControllerManeger" element={<QualityControllerManeger />} />
                {/* <Route path="/Employee_Management" element={<EmployeeManagement />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
