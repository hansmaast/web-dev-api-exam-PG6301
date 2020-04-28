const express = require('express')
const passport = require('passport');

const {
    getUser,
    updateUser,
    signUp,
    login,
    logOut
} = require("../contollers/authController");

const router = express.Router();

router.post('/login', passport.authenticate('local'), login);

router.post('/signup', signUp)

router.post('/logout', logOut);

router.get('/user', getUser);

router.put('/user', updateUser);


module.exports = router;