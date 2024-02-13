const jwt = require("../lib/jwt")
const { SECRET } = require("../config/config")

exports.auth = async (req, res, next) => {

    const token = req.cookies.token

    if (!token) {
        return next();
    }
    
    try {
        const decodedToken = await jwt.verify(token, SECRET)
        req.user = decodedToken
        res.locals.isAuthenticated = true;
        next()
    } catch (error) {
        res.clearCookie("token")
        return res.redirect("/login")
    }
}


exports.isAuth = (req, res, next) => {

    if (!req.user) {
        return res.redirect("/404")
    }

    next()
}

