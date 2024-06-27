const express = require("express");
const mongoose = require("./configuration/dbConfig");
const signupRouter = require("./router/signup");
const bodyParser = require("body-parser");
const cors = require('cors');
const Loginrout =require('./router/login');
const userRoutes = require("./router/userRoutes");
const authRoutes = require("./router/userRoutes");
const EquipmentRoutes = require('./router/Equipment/EquipmentRouter');
const usersRouter = require('./router/userRoutes'); 
const createAdminAccount = require('./scripts/admin');

const app = express();
const PORT = 5004;




app.use(cors());


app.use(express.json());
app.use(cors()); 

createAdminAccount();

app.use(bodyParser.json());
app.use("/Member", signupRouter);
app.use("/auth", Loginrout);

app.use("/services",EquipmentRoutes);

app.use("/api/auth", authRoutes);


app.use('/api/users', usersRouter);

mongoose.connection.once("open", () => {
   

    app.listen(PORT, () => {
        console.log(`Server is running on port: http://localhost:${PORT}`);
    });
});
