const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
});

const Brand = mongoose.model('brand', brandSchema);
module.exports = Brand;