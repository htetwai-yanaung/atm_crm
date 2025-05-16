const mongoose = require('mongoose');

const giftExchangeHistorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    gift_item: {
        name: { type: String, default: null },
        description: { type: String, default: null },
        image: { type: String, default: null },
        point: { type: Number, default: null },
    },
    createdAt: {
        type: Date,
        default: () => {
          const now = new Date();
          const offset = 6.5 * 60 * 60 * 1000; // Myanmar Time is UTC+6:30
          return new Date(now.getTime() + offset);
        },
    }
});

const GiftExchangeHistory = mongoose.model('gift_exchange_history', giftExchangeHistorySchema);
module.exports = GiftExchangeHistory;