const express = require('express');
const AuthController = require('../../controllers/admin/auth_controller');
const route = express.Router();

route.post('/login', AuthController.login);

module.exports = route