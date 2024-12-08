const db = require('../config/dbConfig');

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

const fetchPaginatedEmployees = async ({
  sortby,
  sortorder,
  filter,
  recordPerPage,
  page,
}) => {
  const connection = await db();
  const validSortColumns = ['employee_id', 'name', 'department', 'salary', 'created_at'];
  const sortColumn = validSortColumns.includes(sortby) ? sortby : 'employee_id';
  const sortDirection = sortorder === 'desc' ? 'DESC' : 'ASC';

  const offset = (page - 1) * recordPerPage;

  // Query to fetch the paginated employees
  const dataQuery = `
    SELECT *
    FROM employees
    WHERE name LIKE ? OR department LIKE ?
    ORDER BY ${sortColumn} ${sortDirection}
    LIMIT ? OFFSET ?
  `;

  // Query to get the total count of matching records
  const countQuery = `
    SELECT COUNT(*) as total
    FROM employees
    WHERE name LIKE ? OR department LIKE ?
  `;

  // Execute both queries
  const [rows] = await connection.query(dataQuery, [
    `%${filter}%`,
    `%${filter}%`,
    recordPerPage,
    offset,
  ]);

  const [countResult] = await connection.query(countQuery, [
    `%${filter}%`,
    `%${filter}%`,
  ]);

  const total = countResult[0]?.total || 0;

  return { rows, total };
};

const addEmployeesFromCSV = async (employees) => {
  const connection = await db();
  const query = 'INSERT INTO employees (name, department, salary) VALUES (?, ?, ?)';
  let count = 0;

  for (const employee of employees) {
    try {
      await connection.execute(query, [
        employee.name,
        employee.department,
        employee.salary,
      ]);
      count++;
    } catch (error) {
      console.error('Error inserting employee:', employee.name, error);
    }
  }
  return count;
};

const deleteEmployees = async () => {
  const connection = await db();
  const query = 'DROP TABLE IF EXISTS employees';
  const [result] = await connection.execute(query);
  return result;
};

module.exports = {
  createEmployeeTable,
  insertEmployee,
  getAllEmployees,
  fetchPaginatedEmployees,
  addEmployeesFromCSV,
  deleteEmployees,
};
