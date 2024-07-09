const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');

const EquipmentRoutes = require('./router/Equipment/EquipmentRouter');

const app = express();
const PORT = 5004;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


mongoose.connect("mongodb+srv://tea:1815@cluster0.urovpus.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
    console.log(`MongoDB connection error: ${err}`);
});


app.use("/services", EquipmentRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
});
