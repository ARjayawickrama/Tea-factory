const express = require('express');
const router = express.Router();
const SuperviseC = require('../../controllers/SuperviseEquipment/SuperviseC');
const upload = require('../../middleware/multer'); // Import the Multer middleware

// Add new supervise equipment with image upload
router.post("/", upload.single('image'), SuperviseC.addSupervise);

// Other routes
router.get("/", SuperviseC.getSupervise);
router.get("/:id", SuperviseC.getSuperviseById);
router.put("/:id", upload.single('image'), SuperviseC.updateSuperviseById);
router.delete("/:id", SuperviseC.deleteSuperviseById);

module.exports = router;
