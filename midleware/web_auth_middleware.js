class WebAuthMiddleware
{
    static check(req, res, next)
    {
        if(req.session.auth){
            res.locals.displayName = req.session.displayName;
            res.locals.role = req.session.role;
            res.locals.adminId = req.session.adminId;
            next();
        }else{
            // return res.sendStatus(401);
            return res.redirect('/dashboard/login/782728UserAccess/signin');
        }
    }
}
module.exports = WebAuthMiddleware;