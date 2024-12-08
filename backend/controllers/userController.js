const { deleteAllUsers, getAllUsers, signupService, signinService, refreshTokenService } = require('../services/userServices')

const deleteAllUserController = async (req, res) => {
  try {
    const result = await deleteAllUsers();
    res.status(200).json(result);
  } catch (error) {
    console.error('Error deleting users records:', error);
    res.status(500).json({
      message: 'An error occurred while deleting users records.',
      error: error.message,
    });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const result = await getAllUsers();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while getting users records.',
      error: error.message,
    });
  }
};

const signup = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const result = await signupService(name, email, phone, password);
    res.status(201).json({ message: 'User registered successfully', user: result });
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};

const signin = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const token = await signinService(identifier, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const refreshToken = async (req, res) => {
  const { token } = req.body;

  try {
    const newToken = await refreshTokenService(token);
    res.status(200).json({ token: newToken });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {signup, signin, refreshToken, getAllUsersController, deleteAllUserController};
