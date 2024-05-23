const Sale = require("../models/sale.model");
const StatusCodes = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const validateFields = ({ title, description, address, date }) => {
  if (!title || !description || !address || !date) {
    throw new BadRequestError(
      "Title, description, address, and date fields cannot be empty"
    );
  }
};

const createSale = async (req, res) => {
  validateFields(req.body);
  const { title, description, address, date, items, createdBy } = req.body;

  if (!createdBy) {
    throw new BadRequestError("createdBy field is required");
  }

  const sale = await Sale.create({
    title,
    description,
    address,
    date,
    items,
    createdBy,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ message: "Sale created successfully", sale });
};

const getAllSales = async (req, res) => {
  const sales = await Sale.find({});
  res.status(StatusCodes.OK).json(sales);
};

const getSaleById = async (req, res) => {
  const { id: saleId } = req.params;
  const sale = await Sale.findById(saleId).populate("createdBy", "username");

  if (!sale) {
    throw new NotFoundError(`No sale found with id ${saleId}`);
  }

  res.status(StatusCodes.OK).json(sale);
};

const updateSale = async (req, res) => {
  const { title, description, address, date, items } = req.body;
  validateFields({ title, description, address, date });

  const { id: saleId } = req.params;
  const createdBy = req.user.userId;

  const sale = await Sale.findByIdAndUpdate(
    saleId,
    { title, description, address, date, items, createdBy },
    { new: true, runValidators: true }
  );

  if (!sale) {
    throw new NotFoundError(`No sale found with id ${saleId}`);
  }

  res
    .status(StatusCodes.OK)
    .json({ message: "Sale updated successfully", sale });
};

const deleteSale = async (req, res) => {
  const { id: saleId } = req.params;

  const sale = await Sale.findOneAndDelete({ _id: saleId });

  if (!sale) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: `No sale found with id ${saleId}` });
  }

  return res
    .status(StatusCodes.OK)
    .json({ message: `Sale with id ${saleId} deleted successfully` });
};

const searchSaleByTitle = async (req, res) => {
  const { title } = req.params;
  if (!title) {
    throw new BadRequestError("Title query parameter is required for search");
  }

  const regex = new RegExp(title, "i");
  const sales = await Sale.find({ title: regex });

  res.status(StatusCodes.OK).json(sales);
};

const getSalesCreatedBy = async (req, res) => {
  const { userId } = req.params;
  const sales = await Sale.find({ createdBy: userId })
    .sort({ date: -1 }) // Sort in descending order by date
    .populate("createdBy", "username")
    .exec();

  res.status(StatusCodes.OK).json(sales);
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
  searchSaleByTitle,
  getSalesCreatedBy,
};
