// scripts/admin.js

const bcrypt = require("bcrypt");
const User = require("../model/user");

async function createAdminAccount() {
  try {
    const existingAdmin = await User.findOne({ email: "admin145@test.com" });
    if (!existingAdmin) {
      const newAdmin = new User({
        email: "admin145@test.com",
        name: "admins",
        password: await bcrypt.hash("admin45", 10),
        role: "admin"
      });

      await newAdmin.save();
      console.log("Admin account created successfully");
    } else {
      console.log("Admin already exists");
    }
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = createAdminAccount;
