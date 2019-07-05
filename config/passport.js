const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('./keys');
const conn = require('../config/db');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
    const [users] = await conn.query("SELECT * FROM users WHERE id = ?", jwt_payload.id);
    if(users.length === 0){return done(null, false);};
    return done(null, users[0]);
  }))
};