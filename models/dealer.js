const mongoose = require('mongoose');

const dealerSchema = new mongoose.Schema({
    name: { type: String, default: null },
    phone: { type: String, default: null },
    region: { type: mongoose.Schema.Types.ObjectId, ref: 'region' },
    address: { type: String, default: null },
    createdAt: { type: Date, default: Date.now }
});

const Dealer = mongoose.model('dealer', dealerSchema);
module.exports = Dealer;