const multer  = require('multer');
const path = require('path');
const result = require("../../helpers/result");
const Ads = require('../../models/ads');

class AdsController
{
    static storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/ads/')
        },
        filename: function (req, file, cb) {
            const exten = path.extname(file.originalname);
            cb(null, Date.now() + exten);
        }
    });

    static upload = multer({ storage: AdsController.storage});

    static async uploadImage(req, res){
        res.send(req.file.path);
    }

    static async index(req, res)
    {
        try {
            const ads = await Ads.find();
            res.send(ads);
        } catch(e) {
            res.send([]);
        }
    }

    static async create(req, res)
    {
        try {
            const newAds = new Ads({
                image: req.body.image
            });
            const isSaved = await newAds.save();
            result(isSaved, res);
        } catch(e) {
            result(false, res);
        }
    } 

    static async edit(req, res)
    {
        try {
            const ads = await Ads.findById(req.params.id);
            if(ads){
                res.send(ads);
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
            const ads = await Ads.findById(req.body.id);
            ads.image = req.body.image;

            const isSaved = await ads.save();
            result(isSaved, res);
        } catch(e) {
            result(false, res);
        }
    } 

    static async delete(req, res)
    {
        try {
            const ads = await Ads.findByIdAndDelete(req.query.id);
            result(ads, res);
        } catch(e) {
            result(false, res);
        }
    }
}

module.exports = AdsController;