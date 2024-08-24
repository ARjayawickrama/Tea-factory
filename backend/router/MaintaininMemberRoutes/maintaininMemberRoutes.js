const express = require("express");
const router = express.Router();
const maintaininMemberController = require("../../controllers/MaintaininMember/MaintaininMemberC");

router.get("/", maintaininMemberController.getMaintaininMembers);
router.get("/:id", maintaininMemberController.getMaintaininMemberById);
router.post("/", maintaininMemberController.addMaintaininMember);
router.put("/:id", maintaininMemberController.updateMaintaininMember);
router.delete("/:id", maintaininMemberController.deleteMaintaininMember);

module.exports = router;
