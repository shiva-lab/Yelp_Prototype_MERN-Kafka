// /* eslint-disable consistent-return */
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt  = require('passport-jwt').ExtractJwt;
// const passport = require('passport');
// const jwt = require('jsonwebtoken');
// const { secret } = require('./config');
// const User = require('../models/User');
// const Restaurant = require('../models/Restaurant');

// // Setup work and export for the JWT passport strategy
// function auth() {
//     var opts = {
//         jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
//         secretOrKey: secret
//     };
//     passport.use(
//         new JwtStrategy(opts, (jwt_payload, callback) => {
//             const user_id = jwt_payload._id;
//             User.findById(user_id, (err, results) => {
//                 if (err) {
//                     return callback(err, false);
//                 }
//                 if (results) {
//                     callback(null, results);
//                 }
//                 else {
//                     callback(null, false);
//                 }
//             });
//         })
//     )
// }
// function restauth() {
//     var opts = {
//         jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
//         secretOrKey: secret
//     };
//     passport.use(
//         new JwtStrategy(opts, (jwt_payload, callback) => {
//             const restaurant_id = jwt_payload._id;
//             Restaurant.findById(restaurant_id, (err, results) => {
//                 if (err) {
//                     return callback(err, false);
//                 }
//                 if (results) {
//                     callback(null, results);
//                 }
//                 else {
//                     callback(null, false);
//                 }
//             });
//         })
//     )
// }
// exports.restauth=restauth
// exports.auth = auth;
// exports.checkAuth = passport.authenticate("jwt", { session: false });
// exports.restcheckAuth=passport.authenticate("jwt",{ session: false })