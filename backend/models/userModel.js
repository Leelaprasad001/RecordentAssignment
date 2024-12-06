const db = require('../config/dbConfig');

const listTables = async () => {
  const connection = await db();
  const query = 'SHOW TABLES';
  const [tables] = await connection.execute(query);
  return tables;
};

const createUserTable = async () => {
  const connection = await db();
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      phone VARCHAR(15) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await connection.query(query);
  console.log('User table ensured.');
};

const insertUser = async (userData) => {
  const connection = await db();
  const query = 'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)';
  const [result] = await connection.execute(query, [
    userData.name,
    userData.email,
    userData.phone,
  ]);
  return result;
};

module.exports = { createUserTable, listTables, insertUser };
