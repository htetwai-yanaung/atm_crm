const DeliveryOrder = require('../../models/delivery_order');
const result = require('../../helpers/result');

class DeliveryOrderController
{
    static async index(req, res)
    {
        try {
            const deliveryOrders = await DeliveryOrder.find();
            res.send(deliveryOrders);
        } catch(e) {
            res.send([]);
        }
    }

    static async create(req, res)
    {
        try {
            const newDeliveryOrder = new DeliveryOrder({
                dealer: req.body.dealer_id,
                do_no: req.body.do_no,
                address: req.body.address,
                remark: req.body.remark,
                car_no: req.body.car_no,
                so_no: req.body.so_no,
                products: req.body.products
            });
            const isSaved = await newDeliveryOrder.save();
            result(isSaved, res);
        } catch(e) {
            result(false, res);
        }
    } 

    static async edit(req, res)
    {
        try {
            const deliveryOrder = await DeliveryOrder.findById(req.params.id);
            if(deliveryOrder){
                res.send(deliveryOrder);
            }else{
                res.status(404).json({"message": "not found"});
            }
        } catch(e) {
            result(false, res);
        }
    }

    static async update(req, res)
    {
        try {
            const deliveryOrder = await DeliveryOrder.findById(req.body.id);
            deliveryOrder.dealer = req.body.dealer_id;
            deliveryOrder.do_no = req.body.do_no;
            deliveryOrder.address = req.body.address;
            deliveryOrder.remark = req.body.remark;
            deliveryOrder.car_no = req.body.car_no;
            deliveryOrder.so_no = req.body.so_no;
            deliveryOrder.products = req.body.products;

            const isSaved = await deliveryOrder.save();
            result(isSaved, res);
        } catch(e) {
            result(false, res);
        }
    } 

    static async delete(req, res)
    {
        try {
            const deliveryOrder = await DeliveryOrder.findByIdAndDelete(req.query.id);
            result(deliveryOrder, res);
        } catch(e) {
            result(false, res);
        }
    }
}

module.exports = DeliveryOrderController;