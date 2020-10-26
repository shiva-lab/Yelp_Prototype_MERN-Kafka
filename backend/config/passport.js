const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const restaurant = mongoose.model('restaurant');
const user = mongoose.model('user');
const keys = require('../config/keys');
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload)
      restaurant.findById(jwt_payload.id)
        .then(restaurantdata => {
          if (restaurantdata) {
              console.log("found restaurantdata")
              console.log(restaurantdata)
            return done(null, restaurantdata);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};

module.exports = passport => {
    passport.use(
      new JwtStrategy(opts, (jwt_payload, done) => {
          console.log(jwt_payload)
        user.findById(jwt_payload.id)
          .then(userdata => {
            if (userdata) {
                console.log("User Found")
                console.log(userdata)
              return done(null, userdata);
            }
            return done(null, false);
          })
          .catch(err => console.log(err));
      })
    );
  };
