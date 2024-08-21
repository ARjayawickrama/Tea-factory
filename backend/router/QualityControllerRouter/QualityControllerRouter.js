const express = require("express");
const router = express.Router();
const teaController = require("../../controllers/QualityController/QualityControllerC");


router.get("/", teaController.getTeas);

router.get("/:id", teaController.getTeaById);


router.post("/", teaController.addTea);


router.put("/:id", teaController.updateTea);

router.delete("/:id", teaController.deleteTea);

module.exports = router;
