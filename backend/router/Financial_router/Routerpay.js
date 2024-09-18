// routes/financialRecordRoutes.js
const express = require("express");
const router = express.Router();
const financialRecordController = require("../../controllers/FinancialManagement/Paycontrol");


router.post("/financial-records", financialRecordController.createFinancialRecord);


router.get("/financial-records", financialRecordController.getFinancialRecords);


router.get("/financial-records/:id", financialRecordController.getFinancialRecordById);


router.put("/financial-records/:id", financialRecordController.updateFinancialRecord);


router.delete("/financial-records/:id", financialRecordController.deleteFinancialRecord);

module.exports = router;
