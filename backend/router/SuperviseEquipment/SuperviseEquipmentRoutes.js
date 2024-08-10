const express = require("express");
const router = express.Router();
const SuperviseC = require("../../controllers/SuperviseEquipment/SuperviseC");


// Add new supervise equipment
router.post("/", SuperviseC.addSupervise);

// Get all supervise equipment
router.get("/", SuperviseC.getSupervise);

// Get a single supervise equipment item by ID
router.get("/:id", SuperviseC.getSuperviseById);

// Update a single supervise equipment item by ID
router.put("/:id", SuperviseC.updateSuperviseById);

// Delete a single supervise equipment item by ID
router.delete("/:id", SuperviseC.deleteSuperviseById);

module.exports = router;
