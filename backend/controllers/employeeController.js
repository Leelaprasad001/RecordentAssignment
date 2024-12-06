const path = require('path');
const { insertEmployee, getAllEmployees, addEmployeesFromCSV, generateEmployeePDF } = require('../models/employeeModel');

const addEmployee = async (req, res) => {
  try {
    const { name, department, salary } = req.body;
    if (!name || !department || !salary) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await insertEmployee({ name, department, salary });
    res.status(201).json({ message: 'Employee added successfully', employeeId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add employee', details: error.message });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await getAllEmployees();
    res.status(200).json({ employees });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees', details: error.message });
  }
};

const addEmployeesFromCSVFile = async (req, res) => {
  try {
    if (!req.files || !req.files.csv) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const file = req.files.csv;
    const employees = [];
    
    file.data
      .toString('utf8')
      .split('\n') // Split by line
      .slice(1) // Remove header row
      .forEach((line) => {
        const [name, department, salary] = line.split(',');
        if (name && department && salary) {
          employees.push({
            name: name.trim(),
            department: department.trim(),
            salary: parseFloat(salary.trim()),
          });
        }
      });

    if (employees.length === 0) {
      return res.status(400).json({ error: 'No valid data found in the file' });
    }

    const result = await addEmployeesFromCSV(employees);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add employees from CSV', details: error.message });
  }
};


const downloadEmployeePDF = async (req, res) => {
  try {
    const doc = await generateEmployeePDF();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=employee_data.pdf');
    doc.pipe(res);
    doc.end();
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Failed to generate PDF', details: error.message });
  }
};

module.exports = {
  addEmployee,
  getEmployees,
  addEmployeesFromCSVFile,
  downloadEmployeePDF,
};
