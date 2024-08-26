const express = require("express");
const router = express.Router();
const ContactController = require("../../controllers/Contact/ContactC");


router.get("/", ContactController.getContacts);

router.post("/", ContactController.addContact);

router.get("/:id", ContactController.getContactById);

module.exports = router;
