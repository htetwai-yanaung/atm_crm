const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
    title: { type: String, default: null },
    description: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
});

const Faq = mongoose.model('faq', faqSchema);
module.exports = Faq;