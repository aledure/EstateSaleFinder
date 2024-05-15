const Item = require("../models/item.model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const { uploadItemImage } = require('./../controllers/uploadController'); // Ensure correct import

const validateFields = ({ title, description }) => {
    if (!title || !description) {
        throw new BadRequestError(
            "Title, description, and photo fields cannot be empty"
        );
    }
};

const createItem = async (req, res) => {
    console.log('Creating an item!');
    console.log(req.body);

    validateFields(req.body);
    const { saleId } = req.params;

    console.log(saleId);

    let imageUrl = '';
    if (req.files && req.files.image) {
        const imageResult = await uploadItemImage(req);
        imageUrl = imageResult.image.src;
    }

    const item = await Item.create({ photo: imageUrl, saleId, ...req.body });
    res.status(StatusCodes.CREATED).json({ message: "Item created successfully", item });
};

const getAllItems = async (req, res) => {
    const items = await Item.find({});
    res.status(StatusCodes.OK).json(items);
};

const updateItem = async (req, res) => {
    const { title, description, photo } = req.body;
    validateFields({ title, description, photo });

    const { id: itemId } = req.params;
    const item = await Item.findByIdAndUpdate(
        itemId,
        { title, description, photo },
        { new: true, runValidators: true }
    );

    if (!item) {
        throw new NotFoundError(`No item found with id ${itemId}`);
    }

    res.status(StatusCodes.OK).json({ message: "Item updated successfully", item });
};

const deleteItem = async (req, res) => {
    const { id: itemId } = req.params;
    const item = await Item.findOneAndDelete({ _id: itemId });

    if (!item) {
        throw new NotFoundError(`No item found with id ${itemId}`);
    }

    res.status(StatusCodes.OK).send(`Item with id ${itemId} deleted successfully`);
};

module.exports = { createItem, getAllItems, updateItem, deleteItem };
