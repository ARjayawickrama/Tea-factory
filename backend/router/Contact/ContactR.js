const express = require("express");
const router = express.Router();
const ContactController = require("../../controllers/Contact/ContactC");

// Get all contacts
router.get("/", ContactController.getContacts);

// Add new contact
router.post("/", ContactController.addContact);

// Get contact by ID
router.get("/:id", ContactController.getContactById);

module.exports = router;
