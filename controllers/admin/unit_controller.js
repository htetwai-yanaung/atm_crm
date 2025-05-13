const Unit = require('../../models/unit.js');
const result = require('../../helpers/result.js');

class UnitController
{
    static async index(req, res)
    {
        try {
            const units = await Unit.find();
            res.send(units);
        } catch(e) {
            res.send([]);
        }
    }

    static async create(req, res)
    {
        try {
            const newUnit = new Unit({
                name: req.body.name
            });
            const isSaved = await newUnit.save();
            result(isSaved, res);
        } catch(e) {
            result(false, res);
        }
    }
    
    static async edit(req, res)
    {
        try {
            const unit = await Unit.findById(req.params.id);
            if(unit){
                res.send(unit);
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
            const unit = await Unit.findById(req.body.id);
            unit.name = req.body.name;

            const isSaved = await unit.save();
            result(isSaved, res);
        } catch(e) {
            result(false, res);
        }
    } 

    static async delete(req, res)
    {
        try {
            const unit = await Unit.findByIdAndDelete(req.query.id);
            result(unit, res);
        } catch(e) {
            result(false, res);
        }
    }
}

module.exports = UnitController;