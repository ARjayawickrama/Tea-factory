const bcrypt = require("bcrypt");
const User = require("../model/user");

async function createUser(userData) {
    try {
        const { name, email, password, phoneNumber, gender } = userData;
        
      
        const hashedPassword = await bcrypt.hash(password, 10);
        
      
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            gender,
            role: "customer" 
        });

  
        const savedUser = await newUser.save();
        
        return savedUser;
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email === 1) { 
            
            throw new Error('Email already exists');
        }
        throw error; 
    }
}

module.exports = {
    createUser
};
