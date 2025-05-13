const multer  = require('multer');
const path = require('path');
const result = require("../../helpers/result");
const GiftItem = require('../../models/gift_item');

class GiftItemController
{
    static storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/gift_item/')
        },
        filename: function (req, file, cb) {
            const exten = path.extname(file.originalname);
            cb(null, Date.now() + exten);
        }
    });

    static upload = multer({ storage: GiftItemController.storage});

    static async uploadImage(req, res){
        res.send(req.file.path);
    }

    static async index(req, res)
    {
        try {
            const giftItems = await GiftItem.find();
            res.send(giftItems);
        } catch(e) {
            res.send([]);
        }
    }

    static async create(req, res)
    {
        try {
            const newItem = new GiftItem({
                name: req.body.name,
                description: req.body.description,
                point: req.body.point,
                image: req.body.image
            });
            const isSaved = await newItem.save();
            result(isSaved, res);
        } catch(e) {
            result(false, res);
        }
    } 

    static async edit(req, res)
    {
        try {
            const giftItem = await GiftItem.findById(req.params.id);
            if(giftItem){
                res.send(giftItem);
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
            const giftItem = await GiftItem.findById(req.body.id);
            giftItem.name = req.body.name;
            giftItem.description = req.body.description;
            giftItem.point = req.body.point;
            giftItem.image = req.body.image;

            const isSaved = await giftItem.save();
            result(isSaved, res);
        } catch(e) {
            result(false, res);
        }
    } 

    static async delete(req, res)
    {
        try {
            const giftItem = await GiftItem.findByIdAndDelete(req.query.id);
            result(giftItem, res);
        } catch(e) {
            result(false, res);
        }
    }
}

module.exports = GiftItemController;