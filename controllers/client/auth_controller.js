var jwt = require('jsonwebtoken');
const multer = require('multer')
const path = require('path');
const User = require('../../models/user');
const ReturnMessage = require('../../helpers/return_message');
const SendSMSService = require('../../services/send_sms_service');


class AuthController {

    static storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/profile/')
        },
        filename: function (req, file, cb) {
            const exten = path.extname(file.originalname);
            cb(null, Date.now() + exten);
        }
    });

    static upload = multer({ storage: AuthController.storage });

    static async uploadImage(req, res) {
        res.send(req.file.path);
    }


    static async account(req, res) {
        const user = await User.findById(req.user.id);
        res.send(user);
    }

    static async update(req, res) {
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
    }

    static async register(req, res){
        //
    }

    static async login(req, res) {
        console.log(req.body);
        let user;
        if(req.body.phone != null){
            user = await User.findOne({ phone: req.body.phone });
        }
        
        console.log(user);
        if (user) {
            var token = jwt.sign({
                id: user._id,
                name: user.name,
                phone: user.phone
            }, '123!@#ABC');

            await user.save();

            res.send({
                status: "success",
                message: "Login Successful",
                token: token,
                id: user._id,
            });

        } else {
            const user = new User({
                name: req.body.name,
                phone: req.body.phone,
                contact_number: req.body.contact_number,
                profile: req.body.profile,
                store_name: req.body.store_name,
                date_of_birth: req.body.date_of_birth,
                region: req.body.region_id,
                address: req.body.address
            });
            await user.save();
            var token = jwt.sign({
                id: user._id,
                name: user.name,
                phone: user.phone
            }, '123!@#ABC');

            res.send({
                status: "success",
                message: "Login Successful",
                token: token,
                id: user._id
            });

            // res.send(ReturnMessage.fail("User doesn't exist!!"));
        }
    }

    static async sendOTP(req, res) {
        try {
            const smsService = new SendSMSService();
            console.log(req.body.phone);
            const code = await smsService.sendOTP(req.body.phone);
            res.send(`${code}`);
        } catch (e) {
            console.log(e);
            res.send(null);
        }
    }
}

module.exports = AuthController;
