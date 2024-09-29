// const crypto = require("crypto");
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY ;

if (!secretKey) {
    console.error("Secret Key is not defined. Please check your environment variables.");
}

module.exports = {
    secretKey: secretKey
};


//crypto.randomBytes(32).toString('hex');