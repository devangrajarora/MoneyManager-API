const express = require('express');
const router = express.Router();
const auth = require('./auth');
const user = require('./user');

router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/logout', auth.logout);
router.get('/', user.listAllRecords);
router.post('/addRecord', user.addRecord);
router.post('/deleteRecord', user.deleteRecord);
router.post('/updateRecord', user.updateRecord);

module.exports = router;
