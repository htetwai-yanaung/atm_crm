const mongoose = require('mongoose');

const giftItemSchema = new mongoose.Schema({
    name: { type: String, default: null },
    description: { type: String, default: null },
    image: { type: String, default: null },
    point: { type: Number, default: null },
    createdAt: { type: Date, default: Date.now },
});

const GiftItem = mongoose.model('gift_item', giftItemSchema);
module.exports = GiftItem;