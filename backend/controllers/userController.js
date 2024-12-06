const { insertUser } = require('../models/userModel');


const addUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    console.log('name:', name);
    console.log('email:', email);
    console.log('phone:', phone);
    const result = await insertUser({ name, email, phone });
    res.status(201).json({ message: 'User added successfully', userId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user', details: error.message });
  }
};

module.exports = { addUser };
