const mongoose = require('mongoose')

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    taste: {
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        require: true
    },
    is_drink: {
        type: Boolean,
        default: false
    },
    ingredients: {
        type: [String],
        default: false
    },
    num_sales: {
        tyep: Number,
        default: []
    },
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema)

module.exports = MenuItem;

