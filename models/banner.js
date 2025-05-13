const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    image: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
});

const Banner = mongoose.model('banner', bannerSchema);
module.exports = Banner;