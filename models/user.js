const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    profile: { type: String, default: null },
    name: { type: String, default: null },
    phone: { type: String, default: null },
    contact_number: { type: String, default: null },
    store_name: {type: String, default: null },
    date_of_birth: {type: Date, default: null },
    region: { type: mongoose.Schema.Types.ObjectId, ref: 'region' },
    address: {type: String, default: null },
    createdAt: {
      type: Date,
      default: () => {
        const now = new Date();
        const offset = 6.5 * 60 * 60 * 1000; // Myanmar Time is UTC+6:30
        return new Date(now.getTime() + offset);
      },
  }
  });
  
  const User = mongoose.model('user', UserSchema);
  module.exports = User;