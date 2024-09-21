const express = require('express');
const mongoose = require('./configuration/dbConfig');
const bodyParser = require('body-parser');
const cors = require('cors');

const signupRouter = require('./router/signup');
const loginRouter = require('./router/login');
const authRoutes = require('./router/userRoutes');
const contactRoutes = require('./router/Contact/ContactR');
const maintaininMemberRoutes = require('./router/MaintaininMemberRoutes/maintaininMemberRoutes');
const scheduleMaintenanceRoutes = require('./router/scheduleMaintenanceRoutes/scheduleMaintenanceRoutes');
const superviseRouter = require('./router/SuperviseEquipment/SuperviseEquipmentRoutes');
const technicianRequestRoutes = require('./router/technicianRequestRoutes/technicianRequestRoutes');
const qualityControllerRouter = require('./router/QualityControllerRouter/QualityControllerRouter');
const employeeRouter = require('./router/EmployeeRouter/EmployeeR'); 
const inventoryProductRouter = require('./router/InventoryRouter/ProductR'); 

const createAdminAccount = require('./scripts/admin');
const teaIssueRoutes = require('./router/QualityControllerRouter/teaIssueRoutes'); 

const app = express();
const PORT = 5004; 

// Middleware setup
app.use(cors()); // Enable CORS
app.use(express.json());
app.use(bodyParser.json());

// Create admin account
createAdminAccount();

// Routes
app.use('/contact', contactRoutes);
app.use('/MaintaininMember', maintaininMemberRoutes);
app.use('/ScheduleMaintenance', scheduleMaintenanceRoutes);
app.use('/supervise', superviseRouter);
app.use('/TechnicianRequest', technicianRequestRoutes);
app.use('/QualityController', qualityControllerRouter);

app.use('/Employee', employeeRouter);
app.use('/InventoryProduct', inventoryProductRouter);
app.use('/Member', signupRouter);
app.use('/auth', loginRouter);

app.use('/api/auth', authRoutes);
app.use('/api', teaIssueRoutes);

// Serve static files
app.use('/images', express.static('uploads'));

// Connect to MongoDB and start server
mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
