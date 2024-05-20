// Imports
const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

// Get User by Id
const getUserById = async (req, res) => {
  const { id } = req.params;
  console.log(`Fetching user with id: ${id}`);

  const user = await User.findById(id);
  console.log(`User found: ${JSON.stringify(user)}`);

  if (!user) {
    console.log(`No user found with id: ${id}`);
    throw new NotFoundError(`No user found with id ${id}`);
  }

  // Convert the _id field to a string
  const userWithIdString = { ...user._doc, _id: user._id.toString() };

  return res.status(StatusCodes.OK).json(userWithIdString);
};

module.exports = {
  getUserById,
};
