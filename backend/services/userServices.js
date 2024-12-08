const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/dbConfig');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_EXPIRY = '10m'; 
const JWT_REFRESH_EXPIRY = '10m'; 

const { deleteUsers, getUsers, insertUser, findUserByIdentifier } = require('../models/userModel');

const deleteAllUsers = async () => {
  try {
    const result = await deleteUsers();
    return {
      message: 'All user records have been deleted.',
      deletedRows: result.affectedRows,
    };
  } catch (error) {
    throw new Error('Error while deleting users: ' + error.message);
  }
};

const getAllUsers = async () => {
  try {
    const result = await getUsers();
    return {
      count: result.length,
      data: result,
    };
  } catch (error) {
    throw new Error('Error while fetching users: ' + error.message);
  }
};

const signupService = async (name, email, phone, password) => {
  if (!name || !email || !phone || !password) {
    throw new Error('All fields (name, email, phone, password) are required');
  }
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await insertUser(name, email, phone, hashedPassword);
    return {
      id: result.insertId,
      name,
      email,
      phone,
    };
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new Error('Email or phone already exists');
    }
    throw new Error('Database error: ' + error.message);
  }
};

const signinService = async (identifier, password) => {
  try {
    const users = await findUserByIdentifier(identifier);
    if (users.length === 0) {
      throw new Error('Invalid credentials');
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRY });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error('Authentication failed: ' + error.message);
  }
};

const refreshTokenService = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

    const accessToken = jwt.sign({ id: decoded.id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    const newRefreshToken = jwt.sign({ id: decoded.id }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRY });

    return { accessToken, refreshToken: newRefreshToken };
  } catch (error) {
    throw new Error('Invalid or expired refresh token: ' + error.message);
  }
};

module.exports = {
  deleteAllUsers,
  getAllUsers,
  signinService,
  signupService,
  refreshTokenService,
};
