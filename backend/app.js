const express = require("express");
const mongoose = require("./configuration/dbConfig");
const bodyParser = require("body-parser");
const cors = require('cors');
const nodemailer = require('nodemailer');

const signupRouter = require('./router/signup');
const loginRouter = require('./router/login');
const authRoutes = require('./router/userRoutes');
const contactRoutes = require('./router/Contact/ContactR');

const scheduleMaintenanceRoutes = require('./router/scheduleMaintenanceRoutes/scheduleMaintenanceRoutes');
const resourceRoutes = require('./router/resourceRoutes/resourceRoutes');
const superviseRouter = require('./router/SuperviseEquipment/SuperviseEquipmentRoutes');
const calculationRoutes = require('./router/SuperviseEquipment/calculationRoutes');
const technicianRequestRoutes = require('./router/technicianRequestRoutes/technicianRequestRoutes');
const financialSupplierRoutes = require('./router/SupplierRoutes/financialSupplierRoutes');
const inventorySupplierRoutes = require('./router/SupplierRoutes/inventorySupplierRoutes');
const qualitySupplierRoutes = require('./router/SupplierRoutes/qualitySupplierRoutes');
const supplierRoutes = require('./router/SupplierRoutes/supplierRoutes');
const financialRecordRoutes = require('./router/Financial_router/Routerpay');
const qualityControllerRouter = require('./router/QualityControllerRouter/QualityControllerRouter');


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

app.use('/api/users', usersRouter);
app.use('/EQIsus', eqIsusRouter);
app.use('/api', teaIssueRoutes);
app.use('/FinancialSupplier', financialSupplierRoutes);
app.use('/InventorySupplier', inventorySupplierRoutes);
app.use('/QualitySupplier', qualitySupplierRoutes);
app.use('/SupplierDetails', supplierRoutes);
app.use('/DisplayProduct', displayProductRouter);
app.use('/Checkout', checkoutRoutes);
app.use("/images", express.static("uploads"));

// Nodemailer configuration
const transporter = nodemailer.createTransport({

});

// Send email endpoint
app.post('/send-email', (req, res) => {
  const { email, subject, body } = req.body;


});
