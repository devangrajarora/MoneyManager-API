const mongoose = require('mongoose');

const users = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    records: {
        type: Array,
    }
});

module.exports = mongoose.model('users',users);