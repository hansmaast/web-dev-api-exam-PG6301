const express = require('express');
const bodyParser = require('body-parser');

const app = express();
exports.expressWs = require('express-ws')(app);
exports.WS = require('ws');

const session = require("express-session");
const {passport} = require('./passportConfig');
const helmet = require('helmet');

const path = require('path');

const auth = require('./routes/authentication');
const gameItems = require('./routes/gameItems');
const chat = require('./routes/chat');


// handling JSON payloads
app.use(bodyParser.json());


// enabling a session
app.use(session({
    secret: 'a secret used to encrypt the session cookies',
    resave: false,
    saveUninitialized: false
}));


// sets up security-related HTTP response headers
app.use(helmet());


// needed to server static files
app.use(express.static('public'));


// initializes passport
app.use(passport.initialize());
app.use(passport.session());


// routes
app.use('/api', auth);
app.use('/api', chat);
app.use('/api', gameItems);


// enabling Ws connection
app.ws('/', function(ws, req) {
    console.log('Established a new WS connection');
});


// handling 404 for /api calls
app.all('/api*', (req,res) => {
    res.status(404).send();
});


// handling 404 for all others
app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});

module.exports = {app};