const express = require("express");
const mongoose = require("./configuration/dbConfig");
const bodyParser = require("body-parser");
const cors = require('cors');

// Importing routers
const signupRouter = require("./router/signup");
const Loginrout = require('./router/login');
const authRoutes = require("./router/userRoutes");
const ContactRoutes = require('./router/Contact/ContactR');
const MaintaininMemberRoutes = require('./router/MaintaininMemberRoutes/maintaininMemberRoutes');
const scheduleMaintenanceRoutes = require('./router/scheduleMaintenanceRoutes/scheduleMaintenanceRoutes');
const superviseRouter = require('./router/SuperviseEquipment/SuperviseEquipmentRoutes');
const technicianRequestRoutes = require('./router/technicianRequestRoutes/technicianRequestRoutes');
const financialRecordRoutes = require('./router/Financial_router/Routerpay');
// const qualityController = require('./router/QualityControllerRouter/QualityControllerRouter');
const usersRouter = require('./router/userRoutes'); 
const createAdminAccount = require('./scripts/admin');

const app = express();
const PORT = 5004;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Create admin account
createAdminAccount();

// Routes
app.use("/contact", ContactRoutes);
app.use("/MaintaininMember", MaintaininMemberRoutes);
app.use("/ScheduleMaintenance", scheduleMaintenanceRoutes);
app.use('/supervise', superviseRouter);
app.use('/TechnicianRequest', technicianRequestRoutes);
app.use(express.json()); 
app.use('/api', financialRecordRoutes);
app.use("/Member", signupRouter);
app.use("/auth", Loginrout);
app.use("/api/auth", authRoutes);
app.use('/api/users', usersRouter);
app.use("/images", express.static("uploads"));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

mongoose.connection.once("open", () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: http://localhost:${PORT}`);
    });
});
