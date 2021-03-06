const path = require('path');
require('dotenv').config({ path : path.join(__dirname,'.env')});
const express = require('express');
const session = require('express-session');
const redis = require("redis");
const redisStore = require('connect-redis')(session);

const db = require('./config/db');
const response = require('./utils/response');
const routes = require('./routes');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.SECRET,
      store: new redisStore({ host: 'localhost', port: 6379, client: redis.createClient() }),
      cookie: { maxAge: 604800000 }
    })
);

app.use(response);
app.use('/', routes);

db.connectMongo();

app.listen(PORT, (err) => {
    console.log(err || `Listening on port ${PORT}`);
})