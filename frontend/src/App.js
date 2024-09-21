import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// User Pages
import Home from "./pages/Userpages/Home";
import Login from "./components/user_management/Login";
import Register from "./components/user_management/Registration";
import Equipment from "./pages/Userpages/EquipmentPages/Equipment";
import AboutContent from "./pages/Userpages/AboutContent";
import Gallery from "./pages/Userpages/Gallery";

// Admin Pages
import AdminHome from "./pages/AdminPages/AdminHome";
import Usermanagement from "./pages/AdminPages/Usermanagement";
import Maintainingdashboard from "./components/Navigation_bar/Admin/Maintainingdashboard/Maintainingdashboard";
import SuperviseDashboard from "./components/Navigation_bar/Admin/Maintainingdashboard/superviseDashbord";
import EquipmentCard from "./pages/AdminPages/EquipmentMaintenance/EquipmentCard";
import Issue_Maintaining from "./pages/AdminPages/EquipmentMaintenance/IssueMaintaining/Issue_Maintaining";
import ScheduleMaintenance from "./pages/AdminPages/EquipmentMaintenance/Schedule_Maintenance/ScheduleMaintenance";
import Resources from "./pages/AdminPages/EquipmentMaintenance/Resource/Resource";
import MinePayment from "./pages/AdminPages/EquipmentMaintenance/MinePayment";

// Equipment Maintenance
import EquipmentForm from "./components/equipment_maintenance/EquipmentForm";
import EquipmentDisplay from "./components/equipment_maintenance/EquipmentDisplay";
import EquipmentUpdate from "./components/equipment_maintenance/EquipmentUpdate";

// Financial Management
import FinancialManagement from "./pages/AdminPages/FinancialManagement/FinancialManagement";
import F_Employee from "./pages/AdminPages/FinancialManagement/F_Employee";
import F_supplier from "./pages/AdminPages/FinancialManagement/F_supplier";
import F_order from "./pages/AdminPages/FinancialManagement/F_order";
import Pay from "./pages/AdminPages/FinancialManagement/pay";

// Supplier Management
import Supplier from "./pages/AdminPages/SupplierManagement/Supplier";
import SupplierDetails from "./pages/AdminPages/SupplierManagement/SupplierDetails";
import QualitySupplier from "./pages/AdminPages/SupplierManagement/QualitySupplier";
import InventorySupplier from "./pages/AdminPages/SupplierManagement/InventorySupplier";
import FinancialSupplier from "./pages/AdminPages/SupplierManagement/FinancialSupplier";

// Inventory Management
import Inventory_Managment from "./pages/AdminPages/Inventory-Managment/Inventory_Managment";
import Inventory_Form from "./pages/AdminPages/Inventory-Managment/Inventory_Form";
import Raw_Materials from "./pages/AdminPages/Inventory-Managment/Raw_Materials";

// Quality Control
import QualityControllerManeger from "./pages/AdminPages/Quality_controller/QualityControllerManeger";
import Quality_supervisor from "./pages/AdminPages/Quality_controller/Quality_supervisor";
import TeaIssueDisplay from "./pages/AdminPages/Quality_controller/TeaIssueDesply";
// Employee Management
import EmployeeList from "./pages/AdminPages/Employee_Management/EmployeeList";
import EmployeeAttendance from "./pages/AdminPages/Employee_Management/EmployeeAttendance";
import EmployeeSalaryDetails from "./pages/AdminPages/Employee_Management/EmployeeSalaryDetails";
import Employee_management from "./pages/AdminPages/Employee_Management/Employee_management";
import AddEmployeeForm from "./pages/AdminPages/Employee_Management/AddEmployeeForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AboutContent" element={<AboutContent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/Maintainingdashboard"
          element={<Maintainingdashboard />}
        />
        <Route path="/superviseDashbord" element={<SuperviseDashboard />} />
        <Route path="/usermanagement" element={<Usermanagement />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/equipmentform" element={<EquipmentForm />} />
        <Route path="/EquipmentDisplay" element={<EquipmentDisplay />} />
        <Route path="/EquipmentUpdate/:id" element={<EquipmentUpdate />} />
        <Route path="/EmployeeList" element={<EmployeeList />} />
        <Route path="/EquipmentCard" element={<EquipmentCard />} />
        <Route path="/Resources" element={<Resources />} />
        <Route path="/MinePayment" element={<MinePayment />} />
        <Route path="/Supplier" element={<Supplier />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/FinancialManagement" element={<FinancialManagement />} />
        <Route path="/supplier" element={<F_supplier />} />
        <Route path="/order" element={<F_order />} />
        <Route path="/employee" element={<F_Employee />} />
        <Route path="/pay" element={<Pay />} />

        <Route path="/Quality_supervisor" element={<Quality_supervisor />} />
        <Route
          path="/QualityControllerManeger"
          element={<QualityControllerManeger />}
        />
          <Route
          path="/TeaIssueDisplay"
          element={<TeaIssueDisplay />}
        />
        <Route path="/Issue_Maintaining" element={<Issue_Maintaining />} />
        <Route path="/ScheduleMaintenance" element={<ScheduleMaintenance />} />
        <Route path="/EmployeeAttendance" element={<EmployeeAttendance />} />
        <Route path="/Employee_Management" element={<Employee_management />} />
        <Route
          path="/EmployeeSalaryDetails"
          element={<EmployeeSalaryDetails />}
        />
        <Route path="/AddEmployeeForm" element={<AddEmployeeForm />} />
        <Route path="/Inventory_Managment" element={<Inventory_Managment />} />
        <Route path="/Inventory_Form" element={<Inventory_Form />} />
        <Route path="/Raw_Materials" element={<Raw_Materials />} />
        <Route path="/supplierDetails" element={<SupplierDetails />} />
        <Route path="/qualitySupplier" element={<QualitySupplier />} />
        <Route path="/inventorySupplier" element={<InventorySupplier />} />
        <Route path="/financialSupplier" element={<FinancialSupplier />} />
      </Routes>
    </Router>
  );
}

export default App;
