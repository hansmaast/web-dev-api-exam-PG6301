const express = require('express');
const router = express.Router();
const {
    getMessages,
    postMessage
} = require('../contollers/chatController')

router.get('/messages', getMessages);

router.post('/messages', postMessage);

module.exports = router;