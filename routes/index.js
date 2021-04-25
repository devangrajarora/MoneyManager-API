const express = require('express');
const router = express.Router();

const auth = require('./auth');

hello = (req, res) => {
    console.log(req.session);
    res.sendResponse("hello");
}

router.get('/hello', hello);
router.post('/register', auth.register);
router.get('/login', auth.login);

module.exports = router;