// IMPORTS
const mongoose = require('mongoose');

// SALE SCHEMA
const saleSchema = new mongoose.Schema(
  {
    title: {
        required: [true, 'Please Provide A Title'],
        type: String,
        minlength: 1,
        maxlength: 25,
    },
    description: {
        type: String,
        required:[true, 'Please Provide A Description Of The Sale'],
        minlength: 1,
        maxlength: 150,

    },
    address: {
        type: String,
        required: [true, 'Please Provide A Vaild Address Of The Sale'],
        minlength: 5,
        maxlength: 35,
    },
    date: {
        type: Date,
        required: [true, 'Please Provide A Valid Date'],

    },
    items: {
    type: String,
    required: [true, 'Please Provide An Item To The Sale'],
     },
  });



  // EXPORTS
module.exports = mongoose.model('Sale', saleSchema);