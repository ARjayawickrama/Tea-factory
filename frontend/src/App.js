

// User Pages
import Home from "./pages/Userpages/Home";
import Login from "./components/user_management/Login";
import Register from "./components/user_management/Registration";
import Equipment from "./pages/Userpages/EquipmentPages/Equipment";
import AboutContent from "./pages/Userpages/AboutContent";
import Gallery from "./pages/Userpages/Gallery";



// Quality Control
import QualityControllerManeger from "./pages/AdminPages/Quality_controller/QualityControllerManeger";
import Quality_supervisor from "./pages/AdminPages/Quality_controller/Quality_supervisor";

// Employee Management
import EmployeeList from "./pages/AdminPages/Employee_Management/EmployeeList";
import EmployeeAttendance from "./pages/AdminPages/Employee_Management/EmployeeAttendance";
import EmployeeSalaryDetails from "./pages/AdminPages/Employee_Management/EmployeeSalaryDetails";
import Employee_management from "./pages/AdminPages/Employee_Management/Employee_management";
import AddEmployeeForm from "./pages/AdminPages/Employee_Management/AddEmployeeForm";

// Feedback
import Feedback from "./pages/AdminPages/Feedback/Feedback";
import FeedbackTable from "./pages/AdminPages/Feedback/FeedbackTable";
import FeedbackMainPage from "./pages/Userpages/FeedBack/MainPage";

// Order Management
import Order from "./pages/AdminPages/Order_management/Order";
import ProductList from "./pages/Userpages/MakeOrder/ProductList";
import ProductDetails from "./pages/Userpages/MakeOrder/ProductDetails";
import Cart from "./pages/Userpages/MakeOrder/ShoppingCart";
import Checkout from "./pages/Userpages/MakeOrder/Checkout";

function App() {
  return (
    <CartProvider>
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
          <Route path="/QualityControllerManeger" element={<QualityControllerManeger />} />
          <Route path="/Issue_Maintaining" element={<Issue_Maintaining />} />
          <Route path="/ScheduleMaintenance" element={<ScheduleMaintenance />} />
          <Route path="/EmployeeAttendance" element={<EmployeeAttendance />} />
          <Route path="/Employee_Management" element={<Employee_management />} />
          <Route path="/EmployeeSalaryDetails" element={<EmployeeSalaryDetails />} />
          <Route path="/request-accept" element={<Eqrequst />} />
          <Route path="/AddEmployeeForm" element={<AddEmployeeForm />} />
          <Route path="/Inventory_Managment" element={<Inventory_Managment />} />
          <Route path="/Inventory_Form" element={<Inventory_Form />} />
          <Route path="/Raw_Materials" element={<Raw_Materials />} />
          <Route path="/supplierDetails" element={<SupplierDetails />} />
          <Route path="/qualitySupplier" element={<QualitySupplier />} />
          <Route path="/inventorySupplier" element={<InventorySupplier />} />
          <Route path="/financialSupplier" element={<FinancialSupplier />} />
          <Route path="/FeedbackTable" element={<FeedbackTable />} />
          <Route path="/Feedback" element={<Feedback />} />
          <Route path="/FeedbackMainPage" element={<FeedbackMainPage />} />
          <Route path="/Orderdashboard" element={<Order />} />
          <Route path="/Product" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
