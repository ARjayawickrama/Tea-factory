
const express = require('express');
const { createTeaIssue, getTeaIssues, deleteTeaIssue } = require('../../controllers/QualityController/teaIssueController');

const router = express.Router();

router.post('/QulatiIsusInfrom', createTeaIssue);
router.get('/QulatiIsusInfrom', getTeaIssues);
router.delete('/QulatiIsusInfrom/:id', deleteTeaIssue); 

module.exports = router;
