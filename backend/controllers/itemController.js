const Item = require("../models/item.model");
const { StatusCodes } = require("http-status-codes");

const createItem = async (req, res) => {
    console.log(req.body);
    const item = await Item.create(req.body);
    res.status(StatusCodes.CREATED).json({ item });
};
const getAllItems = async (req, res) => {
    const items = await Item.find({});
    res.status(StatusCodes.OK).json(items);
};

module.exports = { createItem, getAllItems };
