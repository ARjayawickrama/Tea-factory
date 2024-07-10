const express = require("express");
const cors = require("cors");
const { login } = require("../controllers/login"); // Adjusted relative path

const router = express.Router();

router.use(cors()); // Use router.use() to apply CORS middleware to the router

router.post("/login", login);

module.exports = router;
