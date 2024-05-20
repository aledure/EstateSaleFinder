const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Imports
const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

// Email Verification
const sendVerificationEmail = async (email, verificationToken) => {
  const msg = {
    to: email,
    from: "brooklynjsides@gmail.com",
    subject: "MarketSpace Email Verification",
    html: `
      <p>Please click the following link to verify your email address:</p>
      <a href="${process.env.VERIFICATION_URL}api/verify-email?token=${verificationToken}">Verify Email</a>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("Verification email sent");
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

// Register Controller
const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const verificationToken = crypto.randomBytes(40).toString("hex");
  user.verificationToken = verificationToken;
  await user.save();
  await sendVerificationEmail(user.email, verificationToken);
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name }, id: { userID: user._id }, token });
};

// Email Verificaiton Route Handler

const verifyEmail = async (req, res) => {
  console.log("verifyEmail called");
  const { token } = req.query;
  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    console.log("No user found with the provided verification token");
    return res.status(400).json({ message: "Invalid verification token" });
  }

  console.log("User before update:", user);

  user.emailVerified = true;
  user.verificationToken = null;
  const updatedUser = await user.save();

  console.log("User after update:", updatedUser);

  res
    .status(200)
    .json({ message: "Email verified successfully", user: updatedUser });
};

// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  console.log("Searching for user with email:", email);

  // Find User
  const user = await User.findOne({ email });

  console.log("User found:", user);

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  // Compare Password
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  });
};

module.exports = {
  register,
  login,
  verifyEmail,
};
