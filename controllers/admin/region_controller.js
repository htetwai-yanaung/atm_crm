const Region = require('../../models/region');
const result = require('../../helpers/result');

class RegionController
{
    static async index(req, res)
    {
        try {
            const regions = await Region.find();
            res.send(regions);
        } catch(e) {
            res.send([]);
        }
    }

    static async create(req, res)
    {
        try {
            const newRegion = new Region({
                name: req.body.name
            });
            const isSaved = await newRegion.save();
            result(isSaved, res);
        } catch(e) {
            result(false, res);
        }
    } 

    static async edit(req, res)
    {
        try {
            const region = await Region.findById(req.params.id);
            if(region){
                res.send(region);
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
            const region = await Region.findById(req.body.id);
            region.name = req.body.name;

            const isSaved = await region.save();
            result(isSaved, res);
        } catch(e) {
            result(false, res);
        }
    } 

    static async delete(req, res)
    {
        try {
            const region = await Region.findByIdAndDelete(req.query.id);
            result(region, res);
        } catch(e) {
            result(false, res);
        }
    }
}

module.exports = RegionController;