// eqIsusRouter.js
const express = require('express');
const router = express.Router();
const { createIsus, getIsus, deleteIsus } = require('../../controllers/SuperviseEquipment/isusController');

// POST endpoint for creating an Isus entry
router.post('/', createIsus);

// GET endpoint for retrieving all Isus entries
router.get('/', getIsus);

// DELETE endpoint for deleting an Isus entry by ID
router.delete('/:id', deleteIsus);

module.exports = router;
