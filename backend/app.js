const express = require('express');
const mongoose = require('./configuration/dbConfig');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const signupRouter = require('./router/signup');
const loginRouter = require('./router/login');
const authRoutes = require('./router/userRoutes');
const contactRoutes = require('./router/Contact/ContactR');
const maintainingMemberRoutes = require('./router/MaintaininMemberRoutes/maintaininMemberRoutes');
const scheduleMaintenanceRoutes = require('./router/scheduleMaintenanceRoutes/scheduleMaintenanceRoutes');
const superviseRouter = require('./router/SuperviseEquipment/SuperviseEquipmentRoutes');
const technicianRequestRoutes = require('./router/technicianRequestRoutes/technicianRequestRoutes');
const qualityControllerRouter = require('./router/QualityControllerRouter/QualityControllerRouter');
const employeeRouter = require('./router/EmployeeRouter/EmployeeR'); // Use EmployeeR router
const inventoryProductRouter = require('./router/InventoryRouter/ProductR'); // Use ProductR router
const usersRouter = require('./router/userRoutes');
const createAdminAccount = require('./scripts/admin');
const rawMaterialRoute = require('./router/InventoryRouter/RawR');

// Initialize Express app
const app = express();
const PORT = 5004; 

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Create admin account (ensure this is not a route)
createAdminAccount();

// Routes
app.use('/contact', contactRoutes);
app.use('/maintainingMember', maintainingMemberRoutes);
app.use('/scheduleMaintenance', scheduleMaintenanceRoutes);
app.use('/supervise', superviseRouter);
app.use('/technicianRequest', technicianRequestRoutes);
app.use('/qualityController', qualityControllerRouter);
app.use('/employee', employeeRouter); // Employee management routes
app.use('/inventoryProduct', inventoryProductRouter); // Inventory product routes
app.use('/rawmaterials', rawMaterialRoute);

app.use('/member', signupRouter);
app.use('/auth', loginRouter);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRouter);
app.use('/images', express.static('uploads'));

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'sadeepmalaka2@gmail.com', // Use environment variable for security
      pass: 'bfxr wzmt jalb grxp'  // Use environment variable for security
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
