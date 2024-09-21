const express = require('express');
const router = express.Router();
const technicianRequestController = require('../../controllers/Request/Request'); // Ensure this path is correct

// POST: Create a new technician request
router.post('/', technicianRequestController.createTechnicianRequest);

// GET: Get a technician request by ID
router.get('/:id', technicianRequestController.getTechnicianRequestById);

// GET: Get all technician requests
router.get('/', technicianRequestController.getAllTechnicianRequests);

// PUT: Update a technician request by ID
router.put('/:id', technicianRequestController.updateTechnicianRequestById);

// DELETE: Delete a technician request by ID
router.delete('/:id', technicianRequestController.deleteTechnicianRequestById);

module.exports = router;
