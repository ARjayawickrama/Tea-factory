const express = require('express');
const mongoose = require('./configuration/dbConfig');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const signupRouter = require('./router/signup');
const Loginrout = require('./router/login');
const authRoutes = require('./router/userRoutes');
const ContactRoutes = require('./router/Contact/ContactR');
const MaintaininMemberRoutes = require('./router/MaintaininMemberRoutes/maintaininMemberRoutes');
const scheduleMaintenanceRoutes = require('./router/scheduleMaintenanceRoutes/scheduleMaintenanceRoutes');
const superviseRouter = require('./router/SuperviseEquipment/SuperviseEquipmentRoutes');
const technicianRequestRoutes = require('./router/technicianRequestRoutes/technicianRequestRoutes');
const qualityControllerRouter = require('./router/QualityControllerRouter/QualityControllerRouter');
const InventoryProductRouter = require('./router/InventoryRouter/ProductR');
const usersRouter = require('./router/userRoutes');
const createAdminAccount = require('./scripts/admin');
const RawMaterialRoute = require('./router/InventoryRouter/RawR');

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
app.use('/contact', ContactRoutes);
app.use('/MaintaininMember', MaintaininMemberRoutes);
app.use('/ScheduleMaintenance', scheduleMaintenanceRoutes);
app.use('/supervise', superviseRouter);
app.use('/TechnicianRequest', technicianRequestRoutes);
app.use('/QualityController', qualityControllerRouter);
app.use('/InventoryProduct', InventoryProductRouter);
app.use('/rawmaterials', RawMaterialRoute);

app.use('/Member', signupRouter);
app.use('/auth', Loginrout);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRouter);
app.use('/images', express.static('uploads'));

// Email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: 'sadeepmalaka2@gmail.com',
      pass: 'bfxr wzmt jalb grxp'
    }
  });

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
