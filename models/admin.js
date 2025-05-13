const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: { type: String, default: null },
    phone: { type: String, unique: true, default: null },
    password: { type: String, default: null },
    profile: { type: String, default: null },
    role: { type: String, default: null },
    permissions: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
});

const Admin = mongoose.model('admin', adminSchema);
module.exports = Admin;