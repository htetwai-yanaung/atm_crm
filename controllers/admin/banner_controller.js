const multer  = require('multer');
const path = require('path');
const result = require("../../helpers/result");
const Banner = require('../../models/banner');

class BannerController
{
    static storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/banner/')
        },
        filename: function (req, file, cb) {
            const exten = path.extname(file.originalname);
            cb(null, Date.now() + exten);
        }
    });

    static upload = multer({ storage: BannerController.storage});

    static async uploadImage(req, res){
        res.send(req.file.path);
    }

    static async index(req, res)
    {
        try {
            const banners = await Banner.find();
            res.send(banners);
        } catch(e) {
            res.send([]);
        }
    }

    static async create(req, res)
    {
        try {
            const newBanner = new Banner({
                image: req.body.image
            });
            const isSaved = await newBanner.save();
            result(isSaved, res);
        } catch(e) {
            result(false, res);
        }
    }
    
    static async edit(req, res)
    {
        try {
            const banner = await Banner.findById(req.params.id);
            if(banner){
                res.send(banner);
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
            const banner = await Banner.findById(req.body.id);
            banner.image = req.body.image;

            const isSaved = await banner.save();
            result(isSaved, res);
        } catch(e) {
            result(false, res);
        }
    } 

    static async delete(req, res)
    {
        try {
            const banner = await Banner.findByIdAndDelete(req.query.id);
            result(banner, res);
        } catch(e) {
            result(false, res);
        }
    }
}

module.exports = BannerController;