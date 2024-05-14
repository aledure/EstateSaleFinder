const express = require("express");
const router = express.Router();
const { register, login} = require("../controllers/auth");

// Request Methods
router.post("/register", register);
router.post("/login", login);

// Exports
module.exports = router;
