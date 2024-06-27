const bcrypt = require("bcrypt");
const User = require("../model/user");

async function createUser(userData) {
    try {
        const { name, email, password } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: "customer"
        });

        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        if (error.code === 11000) {  
            throw new Error('Email already exists');
        }
        throw error;
    }
}

module.exports = {
    createUser
};
