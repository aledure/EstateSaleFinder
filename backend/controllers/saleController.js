const Item = require("../models/item.model");
const Sale = require("../models/sale.model");
const { StatusCodes } = require("http-status-codes");
const {BadRequestError, NotFoundError} = require("../errors");


const createSale = async (req, res) => {
    console.log('we are here')
    const { user } = req;

    
    if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json;
      }
      if ( title==="" || description ==="" || date ==="" || address ===""){
        throw new BadRequestError("title, description, date, address fields can not be empty")
      }
   const sale = await Sale.create({createdBy: user.userId, ...req.body});
      res.status(StatusCodes.CREATED).json({ sale }); 
};
const getAllSales = async (req, res) => {
    const sales = await Sales.find({});
    res.status(StatusCodes.OK).json(sales);
};
const getSale = async (req,res) => {
    const sales = await Sale.find({});
    res.status(StatusCodes.OK).json(sale);
};
const deleteSale = async (req,res) => {
    const { user } = req;
    const {id} = req.params
    const sale = await Sale.deleteOne({id: id})
    res.status(StatusCodes.OK).json(sale);
}
const updateSale = async (req,res) => {
    const { user } = req;
    const {id} = req.params
    const sale = await Sale.findByIdAndUpdate(id,
        { title,description,image,address,date,  },
        { new: true });
    
    if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json;
      }
    res.status(StatusCodes.OK).json(sale);
}
module.exports = { getSale, createSale, getAllSales,updateSale,deleteSale };