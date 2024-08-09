const express = require("express");
const router = express.Router();
const SuperviseC = require("../../controllers/SuperviseEquipment/SuperviseC");

// Get all supervise equipment
router.get("/", SuperviseC.getSupervise);

// Get supervise equipment by ID
router.get("/:id", SuperviseC.getSuperviseById);

// Add new supervise equipment
router.post("/", SuperviseC.addSupervise);

// Update supervise equipment
router.put("/:id", SuperviseC.updateSupervise);

// Delete supervise equipment
router.delete("/:id", SuperviseC.deleteSupervise);

module.exports = router;
