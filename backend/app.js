const express = require('express');
const mongoose = require('./configuration/dbConfig');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const signupRouter = require('./router/signup');
const loginRouter = require('./router/login');
const authRoutes = require('./router/userRoutes');
const contactRoutes = require('./router/Contact/ContactR');
const maintaininMemberRoutes = require('./router/MaintaininMemberRoutes/maintaininMemberRoutes');
const scheduleMaintenanceRoutes = require('./router/scheduleMaintenanceRoutes/scheduleMaintenanceRoutes');
const resourceRoutes = require('./router/resourceRoutes/resourceRoutes');
const superviseRouter = require('./router/SuperviseEquipment/SuperviseEquipmentRoutes');
const calculationRoutes = require('./router/SuperviseEquipment/calculationRoutes');
const technicianRequestRoutes = require('./router/technicianRequestRoutes/technicianRequestRoutes');
const financialSupplierRoutes = require('./router/SupplierRoutes/financialSupplierRoutes');
const inventorySupplierRoutes = require('./router/SupplierRoutes/inventorySupplierRoutes');
const qualitySupplierRoutes = require('./router/SupplierRoutes/qualitySupplierRoutes');
const teaIssueRoutes = require('./router/QualityControllerRouter/teaIssueRoutes');
const supplierRoutes = require('./router/SupplierRoutes/supplierRoutes');
const eqIsusRouter = require('./router/SuperviseEquipment/eqIsusRouter');
const financialRecordRoutes = require('./router/Financial_router/Routerpay');
const qualityControllerRouter = require('./router/QualityControllerRouter/QualityControllerRouter');
const employeeRouter = require('./router/EmployeeRouter/EmployeeR');
const inventoryProductRouter = require('./router/InventoryRouter/ProductR');
const rawMaterialRoute = require('./router/InventoryRouter/RawR');
const usersRouter = require('./router/userRoutes');

const app = express();
const PORT = 5004;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

function createAdminAccount() {
    console.log('Admin account created');
}

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
app.use('/Resource', resourceRoutes);
app.use("/api", financialRecordRoutes);
app.use("/api", calculationRoutes);
app.use("/Member", signupRouter);
app.use("/auth", loginRouter);
app.use("/api/auth", authRoutes);
app.use('/api/users', usersRouter);
app.use('/EQIsus', eqIsusRouter);
app.use('/api', teaIssueRoutes);
app.use('/FinancialSupplier', financialSupplierRoutes);
app.use('/InventorySupplier', inventorySupplierRoutes);
app.use('/QualitySupplier', qualitySupplierRoutes);
app.use('/SupplierDetails', supplierRoutes);
app.use("/images", express.static("uploads"));

// Nodemailer configuration
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
        from: 'sadeepmalaka2@gmail.com',
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
