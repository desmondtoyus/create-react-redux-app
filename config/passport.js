var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
var db = require('../models');
var settings = require('../config/settings'); // get settings file

module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = settings.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    db.User.findOne({where:{id: jwt_payload.id}})
    .then(user=>{
        if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
    })
    .catch(err=>{
        return done(err, false);
    })
}))
}