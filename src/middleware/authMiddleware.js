function authMiddleware(req, res, next ) {
    if(!req.session.userLogged){
        return res.redirect('/inicioDeSesion');
    }
    next();
}

module.exports = authMiddleware;