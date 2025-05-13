const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema({
    name: { type: String, default: null },
    createdAt: { type: Date, default: Date.now }
});

const Region = mongoose.model('region', regionSchema);
module.exports = Region;