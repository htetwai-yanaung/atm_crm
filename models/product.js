const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, default: null },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'brand' },
    point: { type: Number, default: null },
    unit: { type: mongoose.Schema.Types.ObjectId, ref: 'unit' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
    createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('product', productSchema);
module.exports = Product;