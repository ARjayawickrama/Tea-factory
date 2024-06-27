const mongoose = require("mongoose");

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

module.exports = mongoose;
