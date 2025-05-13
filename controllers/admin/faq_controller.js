const result = require("../../helpers/result");
const Faq = require('../../models/faq');

class FaqController
{
    static async index(req, res)
    {
        try {
            const faqes = await Faq.find();
            res.send(faqes);
        } catch(e) {
            res.send([]);
        }
    }

    static async create(req, res)
    {
        try {
            const newFaq = new Faq({
                title: req.body.title,
                description: req.body.description,
            });
            const isSaved = await newFaq.save();
            result(isSaved, res);
        } catch(e) {
            result(false, res);
        }
    } 

    static async edit(req, res)
    {
        try {
            const faq = await Faq.findById(req.params.id);
            if(faq){
                res.send(faq);
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
            const faq = await Faq.findById(req.body.id);
            faq.title = req.body.title;
            faq.description = req.body.description;

            const isSaved = await faq.save();
            result(isSaved, res);
        } catch(e) {
            result(false, res);
        }
    } 

    static async delete(req, res)
    {
        try {
            const faq = await Faq.findByIdAndDelete(req.query.id);
            result(faq, res);
        } catch(e) {
            result(false, res);
        }
    }
}

module.exports = FaqController;