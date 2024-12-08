const { Readable } = require('stream');
const csvParser = require('csv-parser');
const { addEmployee, addEmployeesFromCSVFile, getPaginatedEmployees, deleteAllEmployees, generateEmployeePDF } = require('../services/employeeService');

const addEmployeeController = async (req, res) => {
  try {
    const result = await addEmployee(req.body);
    res.status(201).json({ message: 'Employee added successfully', employeeId: result.insertId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPaginatedEmployeesController = async (req, res) => {
  try {
    const {
      sortby = 'employee_id',
      sortorder = 'asc',
      filter = '',
      recordPerPage = 10,
      page = 1,
    } = req.query;

    const paginationParams = {
      sortby,
      sortorder,
      filter,
      recordPerPage: parseInt(recordPerPage, 10),
      page: parseInt(page, 10),
    };

    const { rows, total } = await getPaginatedEmployees(paginationParams);

    res.status(200).json({
      success: true,
      data: rows,
      total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch employees' });
  }
};

const addEmployeesFromCSVController = async (req, res) => {
  try {
    const employees = [];
    if (!req.headers['content-type']?.includes('multipart/form-data')) {
      return res.status(400).json({ message: 'Invalid content type. Please upload a CSV file.' });
    }

    const boundary = '--' + req.headers['content-type'].split('boundary=')[1];
    const bodyBuffer = [];
    req.on('data', (chunk) => {
      bodyBuffer.push(chunk);
    });

    req.on('end', async () => {
      const rawData = Buffer.concat(bodyBuffer).toString();
      const start = rawData.indexOf('\r\n\r\n') + 4;
      const end = rawData.lastIndexOf(`\r\n${boundary}`);
      const fileData = rawData.slice(start, end);
      Readable.from(fileData)
        .pipe(csvParser())
        .on('data', (row) => {
          employees.push({
            name: row.name,
            department: row.department,
            salary: parseFloat(row.salary),
          });
        })
        .on('end', async () => {
          try {
            const result = await addEmployeesFromCSVFile(employees);
            res.status(200).json({
              message: result,
            });
          } catch (error) {
            console.error('Error processing employees:', error);
            res.status(500).json({
              message: 'An error occurred while processing the employees.',
              error: error.message,
            });
          }
        })
        .on('error', (error) => {
          console.error('Error reading CSV:', error);
          res.status(400).json({
            message: 'Invalid CSV format.',
            error: error.message,
          });
        });
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ message: 'An unexpected error occurred.' });
  }
};

const deleteAllEmployeesController = async (req, res) => {
  try {
    const result = await deleteAllEmployees();
    res.status(200).json(result);
  } catch (error) {
    console.error('Error deleting employee records:', error);
    res.status(500).json({
      message: 'An error occurred while deleting employee records.',
      error: error.message,
    });
  }
};

const downloadEmployeePDFController = async (req, res) => {
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
  addEmployeeController,
  getPaginatedEmployeesController,
  addEmployeesFromCSVController,
  deleteAllEmployeesController,
  downloadEmployeePDFController
};
