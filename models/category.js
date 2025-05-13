const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, default: null },
    createdAt: { type: Date, default: Date.now }
});

const Category = mongoose.model('category', categorySchema);
module.exports = Category;