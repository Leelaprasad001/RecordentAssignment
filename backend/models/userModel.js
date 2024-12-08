const db = require('../config/dbConfig');

const createUserTable = async () => {
  const connection = await db();
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      phone VARCHAR(15) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await connection.execute(query);
  console.log('User table ensured.');
};

const listTables = async () => {
  const connection = await db();
  const query = 'SHOW TABLES';
  const [tables] = await connection.execute(query);
  const tableDetails = [];

  for (let i = 0; i < tables.length; i++) {
    const tableName = Object.values(tables[i])[0];
    const describeQuery = `DESCRIBE ${tableName}`;
    const [columns] = await connection.execute(describeQuery);
    
    tableDetails.push({
      table: tableName,
      columns
    });
  }

  return tableDetails;
};

const getUsers = async () => {
  const connection = await db();
  const query = 'SELECT * FROM users';
  const [users] = await connection.execute(query);
  return users;
};

const insertUser = async (name, email, phone, password) => {
  const connection = await db();
  const query = 'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)';
  const [result] = await connection.execute(query, [name, email, phone, password]);
  return result;
};

const findUserByIdentifier = async (identifier) => {
  const connection = await db();
  const query = 'SELECT * FROM users WHERE email = ? OR phone = ?';
  const [users] = await connection.execute(query, [identifier, identifier]);
  return users;
};

const deleteUsers = async () => {
  const connection = await db();
  const query = 'DROP TABLE IF EXISTS users';
  const [result] = await connection.execute(query);
  return result;
};

module.exports = { createUserTable, getUsers, insertUser, findUserByIdentifier, deleteUsers, listTables };
