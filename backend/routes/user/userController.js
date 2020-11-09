var kafka = require('../../kafka/client')
var bcrypt = require("bcrypt-nodejs");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");

module.exports = {
    viewuserlist: (req, res) => {
        const body = req.body;
        const data = {
            data: body,
            path: "view_user_list"
        }
        kafka.make_request('user', data, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
                message: "view user list successful"
            });
        });
    },
    usersignup: (req, res) => {
        const body = req.body;
        const data = {
            data: body,
            path: "create_user"
        }
        kafka.make_request('user', data, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
                message: "create user successful"
            });
        });
    },
    userlogin: async (req, res) => {
        const body = req.body;
        const data = {
            data: body,
            path: 'user_login'
        }
        kafka.make_request('user', data, async (err, results) => {
            if (err) {
                return res.status(404).json({
                    success: 0,
                    message: "user Not Found"
                });
            } else {
                //Check Password
                try {
                    const isMatch = bcrypt.compareSync(req.body.userpass, results.userpass)
                    if (!isMatch) {
                        return res.json({
                            success: 0,
                            message: "Invalid Password"
                        });
                    } else {
                        const payload = {
                            _id: results._id,
                            username: results.user_name,
                            location: results.zipcode,
                            Emailid: results.Emailid,
                        };
                        var usertoken = ""
                        await jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 8000 },
                            (err, token) => {
                                usertoken = "Bearer "+token
                            }
                        );
                        res.cookie("cookie1", results._id.toString(), {
                            maxAge: 900000,
                            httpOnly: false,
                            path: "/",
                        });
                        res.cookie("username", results.user_name, {
                            maxAge: 900000,
                            httpOnly: false,
                            path: "/",
                        });
                        return res.json({
                            success: 1,
                            data: usertoken,
                            message: "User SignUp Successful"
                        });
                    }
                } catch (error) {
                    return res.status(404).json({
                        success: 0,
                        message: "User not found"
                    });
                }
            }

        });
    },
    filterusersearch: (req, res) => {
        const body = req.body;
        const data = {
            data: body,
            path: 'filter_user_search'
        }
        kafka.make_request('user', data, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
                message: "filter user search successful"
            });
        });
    },
    followuserprofile: (req, res) => {
        const body = req.body;
        const data = {
            data: body,
            path: 'follow_user_profile'
        }
        kafka.make_request('user', data, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
                message: "follow user profile successful"
            });
        });
    },
    usersifollow: (req, res) => {
        const body = req.body;
        const data = {
            data: body,
            path: 'users_i_follow'
        }
        kafka.make_request('user', data, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
                message: "users i follow successful"
            });
        });
    },
    uviewprofile: (req, res) => {
        const id = req.params.id;
        const data = {
            id: id,
            path: 'uview_profile'
        }
        kafka.make_request('user', data, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
                message: "uviewprofile successful"
            });
        });
    },
    uupdateprofile: (req, res) => {
        const body = req.body;
        const path1 = req.file.location;
        const data = {
            data: body,
            path: 'uupdate_profile',
            path1: path1
        }
        kafka.make_request('user', data, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
                message: "user update profile successful"
            });
        });
    },
}