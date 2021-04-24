const express = require('express');
const router = express.Router();

hello = (req, res) => {
    res.sendResponse("hello");
}

router.get('/hello', hello);

module.exports = router;