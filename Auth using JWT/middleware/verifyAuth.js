const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const verify = jwt.verify(token, "secret") //can add options, TODO: place "secret" in an env var
        req.userData = verify;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Authentication failed"
        })
    }
}