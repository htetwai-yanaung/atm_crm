const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
    name: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
});

const Unit = mongoose.model('unit', unitSchema);
module.exports = Unit;