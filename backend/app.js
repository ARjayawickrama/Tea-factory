const express = require("express");
const mongoose = require("./configuration/dbConfig");
const signupRouter = require("./router/signup");
const bodyParser = require("body-parser");
const cors = require('cors');
const Loginrout =require('./router/login');

const authRoutes = require("./router/userRoutes");
const ContactRoutes = require('./router/Contact/ContactR');
const MaintaininMemberRoutes = require('./router/MaintaininMemberRoutes/maintaininMemberRoutes');
const usersRouter = require('./router/userRoutes'); 
const createAdminAccount = require('./scripts/admin');

const app = express();
const PORT = 5004;

app.use(cors());

app.use(express.json());

app.use(express.json());
app.use(cors()); 

createAdminAccount();

// Routes
app.use(bodyParser.json());

app.use("/contact",ContactRoutes);
app.use("/MaintaininMember",MaintaininMemberRoutes);
app.use("/Member", signupRouter);
app.use("/auth", Loginrout);
app.use("/api/auth", authRoutes);
app.use('/api/users', usersRouter);

mongoose.connection.once("open", () => {
   

    app.listen(PORT, () => {
        console.log(`Server is running on port: http://localhost:${PORT}`);
    });
});
