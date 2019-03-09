const express = require("express")
const router = express.Router()
const User = require("../models/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//Authentication Middleware
const verifyAuth = require("../middleware/verifyAuth");

router.get('/', (req,res) => {
    res.set("Content-Type","text/html")
    res.send('<form action="/" method="post">Email <input type="text" name="email"> Password <input type="password" name="password"> <br><input type="submit" value="Submit"></form>')
})

router.post('/', (req,res) => {
    User.findOne({ email : req.body.email })
        .exec()
        .then( user => {
            //No user
            if (user.length < 1) {
                return res.status(401).json({
                    message: "No user"
                })
            }
            //Compare pass
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Err"
                    })
                }
                console.log(result)
                if (result) {
                    //JWT token generation
                    const token = jwt.sign(
                        {
                            email: user.email,
                            id : user._id,
                        },
                        "secret", //TODO: Add secret jwt key to env variable
                        {
                            expiresIn : "1h"
                        }
                    );
                    return res.status(200).json({
                        message : "Authentication successful",
                        token: token
                    })
                }
            })
        })
        .catch()

})

router.get('/protected', verifyAuth, (req,res) => {
    //Pass token in headers as Authorization
    res.json("Protected page is accessed by user")
})

module.exports = router;