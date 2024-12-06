const db = require('../config/dbConfig');
const fs = require('fs');
const csv = require('csv-parser');
const pdf = require('pdfkit');

const createEmployeeTable = async () => {
  const connection = await db();
  const query = `
    CREATE TABLE IF NOT EXISTS employees (
      employee_id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      department VARCHAR(255) NOT NULL,
      salary DECIMAL(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await connection.query(query);
  console.log('Employee table ensured.');
};

const insertEmployee = async (employeeData) => {
  const connection = await db();
  const query = 'INSERT INTO employees (name, department, salary) VALUES (?, ?, ?)';
  const [result] = await connection.execute(query, [
    employeeData.name,
    employeeData.department,
    employeeData.salary,
  ]);
  return result;
};

const getAllEmployees = async () => {
  const connection = await db();
  const query = 'SELECT * FROM employees';
  const [employees] = await connection.execute(query);
  return employees;
};

const addEmployeesFromCSV = async (employees) => {
    const connection = await db();
    const query = 'INSERT INTO employees (name, department, salary) VALUES (?, ?, ?)';
  
    return new Promise((resolve, reject) => {
      employees.forEach(async (employee) => {
        try {
          await connection.execute(query, [
            employee.name,
            employee.department,
            employee.salary,
          ]);
        } catch (error) {
          reject('Error inserting employees from CSV');
        }
      });
      resolve('Employees added successfully');
    });
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
  createEmployeeTable,
  insertEmployee,
  getAllEmployees,
  addEmployeesFromCSV,
  generateEmployeePDF,
};
