const mysql = require('mysql2/promise');
require('dotenv').config();

const connectToDatabase = async () => {
  try {
    const connection = await mysql.createPool({
      uri: process.env.DB_URL,
    });
    console.log('Database connected successfully!');
    return connection;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
