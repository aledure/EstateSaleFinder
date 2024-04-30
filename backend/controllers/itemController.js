const Item = require("../models/item.model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createItem = async (req, res) => {
    // console.log(req.body);
    const{
        body:{title,description,photo},
        params:{id: itemId}
    }=req;
    if (title === "" || description === "" || photo === "") {
        throw new BadRequestError(
            "title, description, and photo fields cannot be empty"
        );
    }
    const item = await Item.create(req.body);
    res.status(StatusCodes.CREATED).json({ item });
};
const getAllItems = async (req, res) => {
    const items = await Item.find({});
    res.status(StatusCodes.OK).json(items);
};
const updateItem = async (req,res)=>{
    const{
        body:{title,description,photo},
        params:{id: itemId}
    }=req;
    if (title === "" || description === "" || photo === "") {
        throw new BadRequestError(
            "title, description, and photo fields cannot be empty"
        );
    }
    const item = await Item.findByIdAndUpdate(
        { _id: itemId, _saleId: saleId },
        req.body,
        { new: true, runValidators: true }
    );
    if (!item) {
        throw new NotFoundError(`No item with id ${itemId}`);
    }
    res.status(StatusCodes.OK).json({ item });
}
const deleteItem = async (req, res) => {
    const {
        params: { id: itemId },
    } = req;

    const item = await Item.findOneAndDelete({
        _id: itemId,
    });
    if (!item) {
        throw new NotFoundError(`No item with id ${itemId}`);
    }
    res.status(StatusCodes.OK).send(`Deleted item with id ${itemId}`);
};

module.exports = { createItem, getAllItems, updateItem, deleteItem };
