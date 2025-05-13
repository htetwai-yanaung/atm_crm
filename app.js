require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// app.use(bodyParser.urlencoded({
//     extended: true,
//     limit: '35mb',
//     parameterLimit: 50000,
// }));
// app.use(bodyParser.json({limit: '35mb'}));

//Config MongoDB
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DEV_DB_CONNECTION);

app.use(express.json());

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
    // res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.static(__dirname + '/uploads'));
app.use('/uploads', express.static('uploads'));

const AuthMiddleware = require('./midleware/auth_middleware');
const authMiddleware = new AuthMiddleware();

const adminApiRoutes = require('./routes/api_routes/admin_api_routes');
const adminAuthApiRoutes = require('./routes/api_routes/admin_auth_api_routes');
const clientAuthRoutes = require('./routes/api_routes/auth_api_routes');
const userApiRoutes = require('./routes/api_routes/user_api_routes');

//REAL ROUTES
app.use('/admin_auth/api/v1/', adminAuthApiRoutes);
app.use('/admin/api/v1/', authMiddleware.checkUserAuth, adminApiRoutes);

app.use('/auth/api/v1/', clientAuthRoutes);
app.use('/client/api/v1/', authMiddleware.checkUserAuth, userApiRoutes);

app.get('/admin', (req, res) => { res.sendFile(__dirname + '/public/index.html') });

const PORT = process.env.SERVER_PORT || 8080;
app.listen(PORT, (req, res) => { console.log("Server started at port: " + PORT); });