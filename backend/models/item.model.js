// IMPORTS
const mongoose = require('mongoose');



// ITEM SCHEMA
const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please Provide A Title'],
      maxlength: 100,
    },
    description: {
      type: String,
      maxlength: 50,
    },

    photo: {
      type: String,
      required: [true, 'Please Provide A Photo'],
    },
    saleId:{
      type: String,
      required: [true]
    },

  },
  {
    timestamps: true,
  },
);

// EXPORTS
module.exports = mongoose.model('Item', itemSchema);