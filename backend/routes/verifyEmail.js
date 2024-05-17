const express = require("express");
const router = express.Router();
const { verifyEmail } = require("../controllers/auth");

router.get(
  "/",
  (req, res, next) => {
    console.log("Received request at /api/verify-email");
    next();
  },
  verifyEmail
);

module.exports = router;
