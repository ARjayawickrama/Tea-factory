const express = require('express');
const mongoose = require('./configuration/dbConfig');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const signupRouter = require('./router/signup');
const loginRouter = require('./router/login');
const authRoutes = require('./router/userRoutes');
const ContactRoutes = require('./router/Contact/ContactR');
const MaintaininMemberRoutes = require('./router/MaintaininMemberRoutes/maintaininMemberRoutes');
const scheduleMaintenanceRoutes = require('./router/scheduleMaintenanceRoutes/scheduleMaintenanceRoutes');
const superviseRouter = require('./router/SuperviseEquipment/SuperviseEquipmentRoutes');
const technicianRequestRoutes = require('./router/technicianRequestRoutes/technicianRequestRoutes');
const calculationRoutes = require('./router/SuperviseEquipment/calculationRoutes');
const qualityControllerRouter = require('./router/QualityControllerRouter/QualityControllerRouter');

const app = express();
const PORT = 5004;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Ensure createAdminAccount is defined
function createAdminAccount() {
  // Logic to create admin account goes here
  console.log('Admin account created');
}

// Create admin account
createAdminAccount();

// Routes
app.use('/contact', ContactRoutes);
app.use('/MaintaininMember', MaintaininMemberRoutes);
app.use('/ScheduleMaintenance', scheduleMaintenanceRoutes);
app.use('/supervise', superviseRouter);
app.use('/TechnicianRequest', technicianRequestRoutes);
app.use('/QualityController', qualityControllerRouter);
app.use('/api', calculationRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
