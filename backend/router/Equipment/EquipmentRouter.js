const express = require("express");
const router = express.Router();
const EquipmentController = require("../../controllers/Equipment_maintenance/EquipmentC");

// Get all equipment
router.get("/", EquipmentController.getEquipment);

// Add new equipment
router.post("/", EquipmentController.addEquipment);

// Get equipment by ID
router.get("/:id", EquipmentController.getEquipmentById);

// Update equipment by ID
router.put("/:id", EquipmentController.updateEquipment);

// Delete equipment by ID
router.delete("/:id", EquipmentController.deleteEquipment);

module.exports = router;
