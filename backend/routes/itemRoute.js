const express = require("express");
const router = express.Router();

const { createItem, getAllItems } = require("../controllers/itemController");
const { uploadItemImage } = require("../controllers/uploadController");

router.route("/").post(createItem).get(getAllItems);
router.route("/uploads").post(uploadItemImage);

module.exports = router;
