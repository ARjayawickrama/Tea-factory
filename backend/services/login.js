

const bcrypt = require("bcrypt");
const User = require("../model/user"); 
const { generateToken } = require("../utils/jwtUtils"); 

async function login(email, password) {
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            throw new Error("Incorrect password");
        }

        const token = generateToken(existingUser);
        const userRole = existingUser.role;

        // Log the login action
        if (userRole === 'admin') {
            console.log(`Admin logged in: ${existingUser.email}`);
        } else {
            console.log(`User logged in: ${existingUser.email}`);
        }

        return { token, userRole };
       
    } catch (error) {
        throw new Error("Invalid credentials");
    }
}

module.exports = {
    login
};
