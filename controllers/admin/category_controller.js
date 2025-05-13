const Category = require('../../models/category');
const result = require('../../helpers/result.js');

class CategoryController
{
    static async index(req, res)
    {
        try {
            const categories = await Category.find();
            res.send(categories);
        } catch(e) {
            res.send([]);
        }
    }

    static async create(req, res)
    {
        try {
            const newCategory = new Category({
                name: req.body.name
            });
            const isSaved = await newCategory.save();
            result(isSaved, res);
        } catch(e) {
            result(false, res);
        }
    } 

    static async edit(req, res)
    {
        try {
            const category = await Category.findById(req.params.id);
            if(category){
                res.send(category);
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
            const category = await Category.findById(req.body.id);
            category.name = req.body.name;

            const isSaved = await category.save();
            result(isSaved, res);
        } catch(e) {
            result(false, res);
        }
    } 

    static async delete(req, res)
    {
        try {
            const category = await Category.findByIdAndDelete(req.query.id);
            result(category, res);
        } catch(e) {
            result(false, res);
        }
    }
}

module.exports = CategoryController;