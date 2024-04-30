// Imports
const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

// Register Controller
const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name }, id: { userID: user._id }, token });
};
// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  // Find User
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // Compare Password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // Created Token
  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name }, id: { userID: user._id }, token });
};

module.exports = {
  register,
  login,
};
