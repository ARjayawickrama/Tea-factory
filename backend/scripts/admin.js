const bcrypt = require("bcrypt");
const User = require("../model/user");

async function createAdminAccounts() {
    try {
        // Create admin1 account
        const existingAdmin1 = await User.findOne({ email: "admin145@test.com" });
        if (!existingAdmin1) {
            const newAdmin1 = new User({
                email: "admin145@test.com",
                name: "admin1",
                password: await bcrypt.hash("admin45", 10),
                role: "admin"
            });

            await newAdmin1.save();
            console.log("Admin1 account created successfully");
        } else {
            console.log("Admin1 already exists");
        }

        // Create admin2 account
        const existingAdmin2 = await User.findOne({ email: "admin2145@test.com" });
        if (!existingAdmin2) {
            const newAdmin2 = new User({
                email: "admin2145@test.com",
                name: "admin2",
                password: await bcrypt.hash("admin245", 10),
                role: "admin2"
            });

            await newAdmin2.save();
            console.log("Admin2 account created successfully");
        } else {
            console.log("Admin2 already exists");
        }

        // Create admin3 account
        const existingAdmin3 = await User.findOne({ email: "admin3145@test.com" });
        if (!existingAdmin3) {
            const newAdmin3 = new User({
                email: "Supervise@test.com",
                name: "admin3",
                password: await bcrypt.hash("Supervise123", 10),
                role: "admin3"
            });

            await newAdmin3.save();
            console.log("Admin3 account created successfully");
        } else {
            console.log("Admin3 already exists");
        }

        // Create admin4 account
        const existingAdmin4 = await User.findOne({ email: "admin4145@test.com" });
        if (!existingAdmin4) {
            const newAdmin4 = new User({
                email: "admin4145@test.com",
                name: "admin4",
                password: await bcrypt.hash("admin445", 10),
                role: "admin4"
            });

            await newAdmin4.save();
            console.log("Admin4 account created successfully");
        } else {
            console.log("Admin4 already exists");
        }

        // Create admin5 account
        const existingAdmin5 = await User.findOne({ email: "admin5145@test.com" });
        if (!existingAdmin5) {
            const newAdmin5 = new User({
                email: "admin5145@test.com",
                name: "admin5",
                password: await bcrypt.hash("admin545", 10),
                role: "admin5"
            });

            await newAdmin5.save();
            console.log("Admin5 account created successfully");
        } else {
            console.log("Admin5 already exists");
        }

        // Create admin6 account
        const existingAdmin6 = await User.findOne({ email: "admin6145@test.com" });
        if (!existingAdmin6) {
            const newAdmin6 = new User({
                email: "admin6145@test.com",
                name: "admin6",
                password: await bcrypt.hash("admin645", 10),
                role: "admin6"
            });

            await newAdmin6.save();
            console.log("Admin6 account created successfully");
        } else {
            console.log("Admin6 already exists");
        }

        // Create admin7 account
        const existingAdmin7 = await User.findOne({ email: "admin7145@test.com" });
        if (!existingAdmin7) {
            const newAdmin7 = new User({
                email: "admin7145@test.com",
                name: "admin7",
                password: await bcrypt.hash("admin745", 10),
                role: "admin7"
            });

            await newAdmin7.save();
            console.log("Admin7 account created successfully");
        } else {
            console.log("Admin7 already exists");
        }

        // Create admin8 account
        const existingAdmin8 = await User.findOne({ email: "admin8145@test.com" });
        if (!existingAdmin8) {
            const newAdmin8 = new User({
                email: "admin8145@test.com",
                name: "admin8",
                password: await bcrypt.hash("admin845", 10),
                role: "admin8"
            });

            await newAdmin8.save();
            console.log("Admin8 account created successfully");
        } else {
            console.log("Admin8 already exists");
        }

    } catch (error) {
        console.error(error.message);
    }
}

module.exports = createAdminAccounts;
