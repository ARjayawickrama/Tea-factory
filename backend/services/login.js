const bcrypt = require("bcrypt");
const User = require("../model/user"); 
const { generateToken } = require("../utils/jwtUtils"); 

async function login(email, password) {
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            console.error("User not found:", email);
            throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            throw new Error("Incorrect password");
        }

        const token = generateToken(existingUser);
        const userRole = existingUser.role;
        const userId = existingUser._id;

        console.log(`${userRole} logged in: ${existingUser.email}`);

        return { token, userRole, userId };

    } catch (error) {
        throw new Error("Invalid credentials");
    }
}

module.exports = {
    login
};
