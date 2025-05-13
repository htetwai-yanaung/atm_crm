const multer = require('multer')
const path = require('path');
const User = require('../../models/user');

class UserController {

    static storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/profile/')
        },
        filename: function (req, file, cb) {
            const exten = path.extname(file.originalname);
            cb(null, Date.now() + exten);
        }
    });

    static upload = multer({ storage: UserController.storage });

    static async uploadImage(req, res) {
        res.send(req.file.path);
    }

    static async update(req, res) {
        try {
            const user = await User.findById(req.body.id);
            user.name = req.body.name;
            user.profile = req.body.profile;
            user.phone = req.body.phone;
            user.contact_number = req.body.contact_number;
            user.store_name = req.body.store_name;
            user.date_of_birth = req.body.date_of_birth;
            user.region = req.body.region_id;
            user.address = req.body.address;
            await user.save();
            res.send(user);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
}

module.exports = UserController;
