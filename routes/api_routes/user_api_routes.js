const express = require("express");
const route = express.Router();
const UserController = require("../../controllers/client/user_controller");

route.post('/user', UserController.update);

module.exports = route;