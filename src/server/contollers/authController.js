const passport = require('passport');
const Users = require('../db/users');
const {
    validateEmail,
    validatePassword,
    msg
} = require('../../shared/utils');


exports.login = (req, res) => {
    res.status(200).json({user: req.user});
};


exports.signUp = (req, res) => {
    if (!validateEmail(req.body.userId)) {
        res.status(400).json({msg: msg.invalidEmail})
        return;
    }

    if (!validatePassword(req.body.password)) {
        res.status(400).json({msg: msg.invalidPassword})
        return;
    }

    const userIsCreated = Users.createUser(
        req.body.userId,
        req.body.firstName,
        req.body.lastName,
        req.body.password
    );

    if (!userIsCreated) {
        // sends 400 bad request
        res.status(400).json({msg: msg.userExists});
        return;
    }

    passport.authenticate('local')(req, res, () => {
        req.session.save(err => {
            if (err) {
                // sends 500 internal server error
                res.status(500).send();
            } else {
                // send 201 created
                res.status(201).json({user: req.user});
            }
        });
    });
};


exports.logOut = (req, res) => {
    req.logout();
    res.status(204).send();
}


exports.getUser = (req, res) => {
    // Creates a test user
    Users.initTestUser();

    if (!req.user) {
        res.status(401).json({msg: msg.notAuthorized});
        return;
    }
    res.status(200).json({
        user: req.user
    });
};

exports.updateUser = (req, res) => {

    if (!req.user) {
        res.status(401).json({msg: msg.notAuthorized});
        return;
    }

    const user = {...req.body};
    console.log('data for user update:', user);
    const updated = Users.updateUser(user)

    if (updated) {
        res.status(200).json({
            msg: 'user updated!'
        });
    } else {
        res.status(400).json({
            msg: 'could not update user..'
        });
    }
};