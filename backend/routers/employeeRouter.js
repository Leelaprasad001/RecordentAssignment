const express = require('express');
const { addEmployee, getEmployees, addEmployeesFromCSVFile, downloadEmployeePDF } = require('../controllers/employeeController');
const router = express.Router();
const upload = require('../middleware/upload');

router.post('/addManually', addEmployee);
router.post('/addCSV', upload, addEmployeesFromCSVFile);
router.get('/getAllEmp', getEmployees);
router.get('/downloadPDF', downloadEmployeePDF);

module.exports = router;
