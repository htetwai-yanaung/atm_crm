const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const multer  = require('multer');
const path = require('path');
const result = require("../../helpers/result");
const Admin = require('../../models/admin');

class AuthController
{
    static async login(req, res)
    {
        try {
            const admin = await Admin.findOne({phone: req.body.phone});
            if(admin){
                const checkPassword = await bcrypt.compare(req.body.password, admin.password);
                if(checkPassword){
                    var token = jwt.sign({
                        id: admin._id,
                        name: admin.name,
                        phone: admin.phone
                    }, '123!@#ABC');
    
                    await admin.save();
    
                    res.send({
                        status: "success",
                        message: "Login Successful",
                        token: token,
                        id: admin._id,
                    });
                }else{
                    res.status(401).json({
                        status: 'error',
                        message: 'Incorrect Password'
                    });
                }
            }else{
                res.status(404).json({
                    status: 'error',
                    message: 'Admin not found'
                });
            }
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message
            });
        }
    }
}

module.exports = AuthController;