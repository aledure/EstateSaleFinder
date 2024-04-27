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
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please Provide A User'],
      },
    },
    {
      timestamps: true,
    },
  );
  
  // EXPORTS
  module.exports = mongoose.model('Item', itemSchema);