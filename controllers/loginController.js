/**
 * Created by Bar Wachtel on 25/09/2015.
 */
var config = require('../config.js');
var jwt = require('jsonwebtoken');
var User = require('../models/User');

exports.userLogin = function (req, res, next) {
    var token = getToken(req.user);

    req.user.update({
        accessToken: token
    }, function (err) {
        if (err) {
            // Mish mash of error handling - whats the preferred method of doing this?
            next(err);
        } else {
            res.json({
                success: true,
                token: token
            });
        }
    })
};

exports.createUser = function (req, res, next) {
    // Validate user info
    var newUser = {
        username: req.body.username,
        password: req.body.password
    };

    User.create(newUser, function (err, user) {
        if (err) {
            res.json({
                success: false,
                error: err
            });
        } else {
            if (user) {
                req.user = user;
                next();
            }
        }
    });
};

function getToken(details) {
    //Encode mongo user id
    return jwt.sign({
            userId: details._id,
            timestamp: new Date().getMilliseconds()
        }, config.secret,
        {
            //options
        })
}