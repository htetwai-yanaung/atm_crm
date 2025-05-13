const mongoose = require('mongoose');

const adsSchema = new mongoose.Schema({
    image: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
});

const Ads = mongoose.model('ads', adsSchema);
module.exports = Ads;