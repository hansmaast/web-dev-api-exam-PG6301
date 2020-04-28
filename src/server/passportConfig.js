const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Users = require('./db/users');
const {msg} = require('../shared/utils')

passport.use(new LocalStrategy(
    {
        usernameField: 'userId',
        passwordField: 'password'
    },
    function (userId, password, done) {
        const verified = Users.verifyUser(userId, password);

        if (!verified) {
            return done(null, false, {error: msg.invalidUserOrPassword});
        }

        const user = Users.getUser(userId);
        return done(null, user);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.email);
});

passport.deserializeUser(function (id, done) {

    const user = Users.getUser(id);

    if (user) {
        done(null, user);
    } else {
        done(null, false);
    }

});

module.exports = {passport}