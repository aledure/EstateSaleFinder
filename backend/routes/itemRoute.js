const express = require("express");
const router = express.Router();

const { createItem, getAllItems, updateItem, deleteItem, getItemById } = require("../controllers/itemController");
const { uploadItemImage } = require("../controllers/uploadController");

router.route('/').get(getAllItems)
router.route("/:saleId").post(createItem);
router.route('/:id').patch(updateItem).delete(deleteItem)
router.route("/uploads").post(uploadItemImage);
router.route('/:id').get(getItemById);


module.exports = router;
