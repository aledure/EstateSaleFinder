const express = require("express");
const router = express.Router();

const { createItem, getAllItems, updateItem, deleteItem  } = require("../controllers/itemController");
const { uploadItemImage } = require("../controllers/uploadController");

router.route('/').get(getAllItems)
router.route("/:saleId").post(createItem);
router.route('/:id').patch(updateItem).delete(deleteItem)
router.route("/uploads").post(uploadItemImage);

module.exports = router;
