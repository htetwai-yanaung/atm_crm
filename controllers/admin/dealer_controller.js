const Dealer = require('../../models/dealer');
const result = require('../../helpers/result');

class DealerController
{
    static async index(req, res)
    {
        try {
            const dealers = await Dealer.find().populate('region');
            res.send(dealers);
        } catch(e) {
            res.send([]);
        }
    }

    static async create(req, res)
    {
        try {
            const newDealer = new Dealer({
                name: req.body.name,
                phone: req.body.phone,
                region: req.body.region_id,
                address: req.body.address
            });
            const isSaved = await newDealer.save();
            result(isSaved, res);
        } catch(e) {
            result(false, res);
        }
    } 

    static async edit(req, res)
    {
        try {
            const dealer = await Dealer.findById(req.params.id).populate('region');
            if(dealer){
                res.send(dealer);
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
            const dealer = await Dealer.findById(req.body.id);
            dealer.name = req.body.name;
            dealer.phone = req.body.phone;
            dealer.region = req.body.region_id;
            dealer.address = req.body.address;

            const isSaved = await dealer.save();
            result(isSaved, res);
        } catch(e) {
            result(false, res);
        }
    } 

    static async delete(req, res)
    {
        try {
            const dealer = await Dealer.findByIdAndDelete(req.query.id);
            result(dealer, res);
        } catch(e) {
            result(false, res);
        }
    }
}

module.exports = DealerController;