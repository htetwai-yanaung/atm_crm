const Brand = require('../../models/brand.js');
const result = require('../../helpers/result.js');

class BrandController
{
    static async index(req, res)
    {
        try {
            const brands = await Brand.find();
            res.send(brands);
        } catch(e) {
            res.send([]);
        }
    }

    static async create(req, res)
    {
        try {
            const newBrand = new Brand({
                name: req.body.name
            });
            const isSaved = await newBrand.save();
            result(isSaved, res);
        } catch(e) {
            result(false, res);
        }
    } 

    static async edit(req, res)
    {
        try {
            const brand = await Brand.findById(req.params.id);
            if(brand){
                res.send(brand);
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
            const brand = await Brand.findById(req.body.id);
            brand.name = req.body.name;

            const isSaved = await brand.save();
            result(isSaved, res);
        } catch(e) {
            result(false, res);
        }
    } 

    static async delete(req, res)
    {
        try {
            const brand = await Brand.findByIdAndDelete(req.query.id);
            result(brand, res);
        } catch(e) {
            result(false, res);
        }
    }
}

module.exports = BrandController;