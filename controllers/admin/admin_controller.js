const bcrypt = require('bcrypt');
const multer  = require('multer');
const path = require('path');
const result = require("../../helpers/result");
const Admin = require('../../models/admin');

class AdminController
{
    static storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/profile/')
        },
        filename: function (req, file, cb) {
            const exten = path.extname(file.originalname);
            cb(null, Date.now() + exten);
        }
    });

    static upload = multer({ storage: AdminController.storage});

    static async uploadImage(req, res){
        res.send(req.file.path);
    }

    static async index(req, res)
    {
        try {
            const admins = await Admin.find();
            res.send(admins);
        } catch(e) {
            res.send([]);
        }
    }

    static async create(req, res)
    {
        try {
            const phone = req.body.phone;
            const phoneAlreadyExist = await Admin.findOne({ phone });
            if (phoneAlreadyExist) {
                return res.status(409).json({ error: 'Phone number already exists' });
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newAdmin = new Admin({
                name: req.body.name,
                phone: req.body.phone,
                password: hashedPassword,
                profile: req.body.profile,
                role: req.body.role,
                permissions: req.body.permissions
            });
            const isSaved = await newAdmin.save();

            result(isSaved, res);
        } catch(e) {
            result(false, res);
        }
    } 

    static async edit(req, res)
    {
        try {
            const admin = await Admin.findById(req.params.id);
            if(admin){
                res.send(admin);
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
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const admin = await Admin.findById(req.body.id);
            admin.name = req.body.name;
            admin.phone = req.body.phone;
            admin.password = hashedPassword;
            admin.profile = req.body.profile;
            admin.role = req.body.role;
            admin.permissions = req.body.permissions;

            const isSaved = await admin.save();
            result(isSaved, res);
        } catch(e) {
            if (e.code === 11000 && e.keyPattern?.phone) {
                res.status(409).json({ error: 'Phone number already exists' }); // fallback
            } else {
                result(false, res);
            }
        }
    } 

    static async delete(req, res)
    {
        try {
            const admin = await Admin.findByIdAndDelete(req.query.id);
            result(admin, res);
        } catch(e) {
            result(false, res);
        }
    }
}

module.exports = AdminController;