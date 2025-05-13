const Product = require('../../models/product');
const result = require('../../helpers/result');

class ProductController
{
    static async index(req, res)
    {
        try {
            const products = await Product.find().populate('brand').populate('unit').populate('category');
            res.send(products);
        } catch(e) {
            res.send([]);
        }
    }

    static async create(req, res)
    {
        try {
            const newProduct = new Product({
                name : req.body.name,
                brand : req.body.brand_id,
                point : req.body.point,
                unit : req.body.unit_id,
                category : req.body.category_id
            });
            const isSaved = await newProduct.save();
            result(isSaved, res);
        } catch(e) {
            result(false, res);
        }
    } 

    static async edit(req, res)
    {
        try {
            const product = await Product.findById(req.params.id).populate('brand').populate('unit').populate('category');
            if(product){
                res.send(product);
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
            const product = await Product.findById(req.body.id);
            product.name = req.body.name;
            product.brand = req.body.brand_id;
            product.point = req.body.point;
            product.unit = req.body.unit_id;
            product.category = req.body.category_id;
            const isSaved = await product.save();
            result(isSaved, res);
        } catch(e) {
            result(false, res);
        }
    } 

    static async delete(req, res)
    {
        try {
            const product = await Product.findByIdAndDelete(req.query.id);
            result(product, res);
        } catch(e) {
            result(false, res);
        }
    }
}

module.exports = ProductController;