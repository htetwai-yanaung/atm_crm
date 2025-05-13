var jwt = require('jsonwebtoken');

module.exports = function userWSAuth(ws, req, next) {
    console.log("START CHECKING");
    var hashKey = "123!@#ABC";
    const auth = req.query.authorization;
    // if (!auth) return res.sendStatus(401);
    // const [type, token] = auth.split(" ");
    // if (type !== "Bearer") return res.sendStatus(401);
    const token = auth;
    jwt.verify(token, hashKey, function (err, data) {
        req.user = data;
        if (err){
            console.log("USER NOT FOUND");
            return res.sendStatus(401);
        }else{
            req.user = data;
            console.log("MIDDLEWARE SUCCESS");
            next();
        }
    });
}