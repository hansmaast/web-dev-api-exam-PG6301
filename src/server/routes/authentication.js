const express = require('express')
const passport = require('passport');

const {
    getUser,
    signUp,
    login,
    logOut
} = require("../contollers/authController");

const router = express.Router();

router.post('/login', passport.authenticate('local'), login);

router.post('/signup', signUp)

router.post('/logout', logOut);

router.get('/user', getUser);


module.exports = router;