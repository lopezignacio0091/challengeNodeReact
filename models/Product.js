const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required:true
    },
});

module.exports = mongoose.model('Product', ProductSchema);