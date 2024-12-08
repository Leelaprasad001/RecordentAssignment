const pdf = require('pdfkit');
const { PDFDocument } = require('pdf-lib'); 
const { insertEmployee, getAllEmployees, fetchPaginatedEmployees, addEmployeesFromCSV, deleteEmployees } = require('../models/employeeModel');

const addEmployee = async (employeeData) => {
  const { name, department, salary } = employeeData;
  if (!name || !department || !salary) {
    throw new Error('All fields are required');
  }
  return await insertEmployee({ name, department, salary });
};

const getPaginatedEmployees = async (paginationParams) => {
  return await fetchPaginatedEmployees(paginationParams);
};
  
const addEmployeesFromCSVFile = async (csvData) => {
  const employees = [];
  csvData.forEach((row) => {
    employees.push({
      name: row.name,
      department: row.department,
      salary: parseFloat(row.salary),
    });
  });
  const count = await addEmployeesFromCSV(employees);
  return `${count} employees successfully added to the database.`;
};

const deleteAllEmployees = async () => {
  const result = await deleteEmployees();
  return {
    message: 'All employee records have been deleted.',
    deletedRows: result.affectedRows,
  };
};

const generateEmployeePDF = async () => {
    const employees = await getAllEmployees();
    const doc = new pdf();
    doc.fontSize(18).text('Employee Data', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text('-------------------------------------------------');
    doc.text('ID | Name | Department | Salary');
    doc.text('-------------------------------------------------');
    employees.forEach((employee) => {
      doc.text(
        `${employee.employee_id} | ${employee.name} | ${employee.department} | ${employee.salary}`
      );
    });
    return doc;
};

module.exports = {
  addEmployee,
  getPaginatedEmployees,
  addEmployeesFromCSVFile,
  deleteAllEmployees,
  generateEmployeePDF
};
