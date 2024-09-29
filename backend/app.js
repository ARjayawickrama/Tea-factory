const express = require("express");
const mongoose = require("./configuration/dbConfig");
const bodyParser = require("body-parser");
const cors = require('cors');
const nodemailer = require('nodemailer');

const signupRouter = require('./router/signup');
const loginRouter = require('./router/login');
const usersRouter = require('./router/userRoutes');
const authRoutes = require('./router/userRoutes');
const contactRoutes = require('./router/Contact/ContactR');
const maintaininMemberRoutes = require('./router/MaintaininMemberRoutes/maintaininMemberRoutes');
const scheduleMaintenanceRoutes = require('./router/scheduleMaintenanceRoutes/scheduleMaintenanceRoutes');
const resourceRoutes = require('./router/resourceRoutes/resourceRoutes');
const superviseRouter = require('./router/SuperviseEquipment/SuperviseEquipmentRoutes');
const calculationRoutes = require('./router/SuperviseEquipment/calculationRoutes');
const technicianRequestRoutes = require('./router/technicianRequestRoutes/technicianRequestRoutes');
const EmployeeSalaryR = require('./router/EmployeeRouter/EmployeeSalaryR');
const financialSupplierRoutes = require('./router/SupplierRoutes/financialSupplierRoutes');
const inventorySupplierRoutes = require('./router/SupplierRoutes/inventorySupplierRoutes');
const qualitySupplierRoutes = require('./router/SupplierRoutes/qualitySupplierRoutes');
const supplierRoutes = require('./router/SupplierRoutes/supplierRoutes');
const financialRecordRoutes = require('./router/Financial_router/Routerpay');
const qualityControllerRouter = require('./router/QualityControllerRouter/QualityControllerRouter');
const employeeRouter = require('./router/EmployeeRouter/EmployeeR');
const inventoryProductRouter = require('./router/InventoryRouter/ProductR');
const rawMaterialRoute = require('./router/InventoryRouter/RawR');
const SuperviseCalculate = require('./router/SuperviseEquipment/calculationRoutes');
const teaIssueRoutes = require('./router/QualityControllerRouter/teaIssueRoutes');
const eqIsusRouter = require('./router/SuperviseEquipment/eqIsusRouter');
const feedbackRoutes = require('./router/feedbackRoutes/feedbackRoutes');
const createAdminAccount = require('./scripts/admin');
const checkoutRoutes = require('./router/CheckoutRouter/CheckoutR');
const displayProductRouter = require('./router/OrderRouter/AddProductR');

// Initialize Express app
const app = express();
const PORT = 5004;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Create admin account
createAdminAccount();

// Routes
app.use("/contact", contactRoutes);
app.use("/MaintaininMember", maintaininMemberRoutes);
app.use("/ScheduleMaintenance", scheduleMaintenanceRoutes);
app.use('/supervise', superviseRouter);
app.use('/TechnicianRequest', technicianRequestRoutes);
app.use('/QualityController', qualityControllerRouter);
app.use('/Employee', employeeRouter);
app.use('/InventoryProduct', inventoryProductRouter);
app.use('/rawmaterials', rawMaterialRoute);
app.use("/Resource", resourceRoutes);
app.use("/", eqIsusRouter);
app.use("/api", financialRecordRoutes);
app.use("/api", SuperviseCalculate);
app.use("/", feedbackRoutes);
app.use("/Member", signupRouter);
app.use("/auth", loginRouter);
app.use('/api/users', usersRouter); 
app.use("/api/auth", authRoutes);
app.use("/api", teaIssueRoutes);
app.use('/SalaryDetails', EmployeeSalaryR); 
app.use('/FinancialSupplier', financialSupplierRoutes);
app.use('/InventorySupplier', inventorySupplierRoutes);
app.use('/QualitySupplier', qualitySupplierRoutes);
app.use('/SupplierDetails', supplierRoutes);
app.use('/DisplayProduct', displayProductRouter);
app.use('/Checkout', checkoutRoutes);
app.use("/images", express.static("uploads"));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sadeepmalaka2@gmail.com', 
        pass: 'bfxr wzmt jalb grxp'  
    }
  });
  
  // Send email endpoint
  app.post('/send-email', (req, res) => {
    const { email, subject, body } = req.body;
  
    const mailOptions = {
        from: 'sadeepmalaka2@gmail.com', // Use environment variable for security
        to: email,
        subject: subject,
        text: body
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error);
            return res.status(500).send('Failed to send email');
        }
        console.log('Email sent:', info.response);
        res.send('Email sent successfully');
    });
  });
  
  // Connect to MongoDB and start server
  mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
  });