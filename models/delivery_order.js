const mongoose = require('mongoose');

const deliveryOrderSchema = new mongoose.Schema({
    dealer: { type: mongoose.Schema.Types.ObjectId, ref: 'dealer' },
    do_no: { type: String, default: null },
    address: { type: String, default: null },
    remark: { type: String, default: null },
    car_no: { type: String, default: null },
    so_no: { type: String, default: null },
    products: [
        {
            quantity: { type: Number, default: null },
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' }
        }
    ],
    createdAt: { type: Date, default: Date.now },
});

const DeliveryOrder = mongoose.model('delivery_order', deliveryOrderSchema);
module.exports = DeliveryOrder;