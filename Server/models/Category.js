const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    createdOn: {
        type: Date,
        default: Date.now,
    }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;