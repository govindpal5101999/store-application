const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true
    },
    UnitPrice: {
        type: Number,
        required: true
    },
    TotalAmount: {
        type: Number,
        required: true
    },
    Date: {
        type: Date,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
    // Image: {
    //     data: Buffer,
    //     contentType: String
    // },

    Status: {
        type: String,
        required: true
    }

})

const Product = mongoose.model('productslist', productSchema);

module.exports = Product;

