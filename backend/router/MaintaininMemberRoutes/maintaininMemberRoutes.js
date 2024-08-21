const express = require("express");
const router = express.Router();
const maintaininMemberController = require("../../controllers/MaintaininMember/MaintaininMemberC");

// Get all maintainin members
router.get("/", maintaininMemberController.getMaintaininMembers);

// Get maintainin member by ID
router.get("/:id", maintaininMemberController.getMaintaininMemberById);

// Add new maintainin member
router.post("/", maintaininMemberController.addMaintaininMember);

// Update maintainin member
router.put("/:id", maintaininMemberController.updateMaintaininMember);

// Delete maintainin member
router.delete("/:id", maintaininMemberController.deleteMaintaininMember);

module.exports = router;
