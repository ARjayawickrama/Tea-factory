const express = require("express");
const mongoose = require("./configuration/dbConfig");
const signupRouter = require("./router/signup");
const bodyParser = require("body-parser");
const cors = require('cors');
const Loginrout = require('./router/login');
const authRoutes = require("./router/userRoutes");
const ContactRoutes = require('./router/Contact/ContactR');
const MaintaininMemberRoutes = require('./router/MaintaininMemberRoutes/maintaininMemberRoutes');
const scheduleMaintenanceRoutes = require('./router/scheduleMaintenanceRoutes/scheduleMaintenanceRoutes');
const superviseRouter = require('./router/SuperviseEquipment/SuperviseEquipmentRoutes');
const technicianRequestRoutes = require('./router/technicianRequestRoutes/technicianRequestRoutes');
const qualityControllerRouter = require('./router/QualityControllerRouter/QualityControllerRouter');
const usersRouter = require('./router/userRoutes');
const feedbackRoutes = require('./router/feedbackRoutes/feedbackRoutes');
const createAdminAccount = require('./scripts/admin');

const app = express();
const PORT = 5004; 

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

createAdminAccount();

// Routes
app.use("/contact", ContactRoutes);
app.use("/MaintaininMember", MaintaininMemberRoutes);
app.use("/ScheduleMaintenance", scheduleMaintenanceRoutes);
app.use('/supervise', superviseRouter);
app.use('/TechnicianRequest', technicianRequestRoutes);
app.use('/QualityController', qualityControllerRouter);
app.use("/Member", signupRouter);
app.use('/', feedbackRoutes);
app.use("/auth", Loginrout);
app.use("/api/auth", authRoutes);
app.use('/api/users', usersRouter);
app.use("/images", express.static("uploads"));

mongoose.connection.once("open", () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: http://localhost:${PORT}`);
    });
});
