const express = require('express');
const { addEmployeeController,getPaginatedEmployeesController, addEmployeesFromCSVController, downloadEmployeePDFController, deleteAllEmployeesController } = require('../controllers/employeeController');
const router = express.Router();

router.post('/addManually', addEmployeeController);
router.post('/addCSV', addEmployeesFromCSVController);
router.get('/getAllEmp', getPaginatedEmployeesController);
router.delete('/deleteAll', deleteAllEmployeesController);
router.get('/downloadPDF', downloadEmployeePDFController);

module.exports = router;
