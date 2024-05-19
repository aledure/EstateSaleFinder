// Imports
const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

// Get User by Id
const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id, 'username email');
  if (!user) {
    throw new NotFoundError(`No user found with id ${id}`);
  }

  return res.status(StatusCodes.OK).json(user);
};

module.exports = {
  getUserById,
};
