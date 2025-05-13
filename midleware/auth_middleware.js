var jwt = require('jsonwebtoken');

class AuthMiddleware {

    userSecret = process.env.USER_SECRET;
    adminSecret = process.env.ADMIN_SECRET;
    runnerSecret = process.env.RUNNER_SECRET;

    //User
    checkUserAuth(req, res, next) {
        const authHeader = req.headers["authorization"];
        if (!authHeader) return res.sendStatus(401);
        const [type, token] = authHeader.split(" ");
        if (type !== "Bearer") return res.sendStatus(401);
        jwt.verify(token, "123!@#ABC", function (err, data) {
            if (err){
                return res.sendStatus(401);
            }else{
                
                req.user = {
                    id: data.id,
                    name: data.name,
                    phone: data.phone
                };
                next();
            }
        });
    }

    generateUserToken(user){
        const userData = {
            'id': user._id,
            'name': user.name
        };
        var token = jwt.sign(userData, this.userSecret);
        return token;
    }


    //Admin
    checkAdminAuth(req, res, next) {
        const authHeader = req.headers["authorization"];
        if (!authHeader) return res.sendStatus(401);
        const [type, token] = authHeader.split(" ");
        if (type !== "Bearer") return res.sendStatus(401);
        jwt.verify(token, this.adminSecret, function (err, data) {
            if (err){
                return res.sendStatus(401);
            }else{
                const admin = jwt.verify(token, this.adminSecret);
                req.admin = admin;
                next();
            }
        });
    }

    generateAdminToken(admin){
        const adminData = {
            'id': admin._id,
            'name': admin.name
        };
        var token = jwt.sign(adminData, this.adminSecret);
        return token;
    }

    //Runner
    checkRunnerAuth(req, res, next) {
        const authHeader = req.headers["authorization"];
        if (!authHeader) return res.sendStatus(401);
        const [type, token] = authHeader.split(" ");
        if (type !== "Bearer") return res.sendStatus(401);
        jwt.verify(token, this.runnerSecret, function (err, data) {
            if (err){
                return res.sendStatus(401);
            }else{
                const runner = jwt.verify(token, this.runnerSecret);
                req.runner = runner;
                next();
            }
        });
    }

    generateRunnerToken(runner){
        const runnerData = {
            'id': runner._id,
            'name': runner.name
        };
        var token = jwt.sign(runnerData, this.runnerSecret);
        return token;
    }
}

module.exports = AuthMiddleware;