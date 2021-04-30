/**
 * A Passport strategy for authenticating with a JSON Web Token.
 */
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require ('passport-jwt').ExtractJwt;
const User = require('../models/usermodel');
const config = require ('./database.config');

/**
 * Returns user by authenticating endpoints using JSON web token.
 * Intended to be used to secure RESTful endpoints without sessions.
 */
module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        //console.log(jwt_payload);

       User.getUserById(jwt_payload._id, (err, user) => {
           if(err){
               return done(err, false);

           }
            if(user){
                return done(null, user);

            }
            else {
                return done(null, false);

            }
       });
    }));
}