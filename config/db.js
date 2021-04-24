const mongoose = require('mongoose');

const connectMongo = () => {
    const mongouri = process.env.mongouri;
    mongoose.connect(mongouri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
    (err) => console.log(err || 'Connected to mongodb'));    
};

module.exports = {
    connectMongo
};