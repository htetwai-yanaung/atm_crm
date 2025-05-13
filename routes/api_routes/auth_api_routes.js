const express = require('express');
const AuthController = require('../../controllers/client/auth_controller');
const route = express.Router();

route.post('/login', AuthController.login);
route.post('/send-otp', AuthController.sendOTP);
route.post('/upload-profile', AuthController.upload.single('profile'), AuthController.uploadImage);


module.exports = route