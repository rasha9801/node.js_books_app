require('express-async-errors');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require("express");
const books = require("../routes/books");
const customers = require("../routes/customers");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const home = require("../routes/home");
const error = require('../middleware/error');
const winston = require('winston');

module.exports = function(app) {
    app.use(express.json());
    app.use(express.static('public'));
    app.use(helmet());
    app.use("/api/books", books);
    app.use("/api/customers", customers);
    app.use("/api/rentals", rentals);
    app.use("/api/users", users);
    app.use("/api/auth", auth);
    app.use("/", home);
    app.use(error);

    if (app.get('env') === 'development') {
        app.use(morgan('tiny'));
        winston.info("Morgan enabled...");
    }
}