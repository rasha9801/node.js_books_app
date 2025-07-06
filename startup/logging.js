const winston = require("winston");
require("winston-mongodb");

module.exports = function() {
    winston.add(new winston.transports.File({ filename: "logfile.log" }));
    winston.add(new winston.transports.Console());
    winston.add(new winston.transports.MongoDB({ db: "" }));

    winston.exceptions.handle(
        new winston.transports.File({ filename: "unhandledExceptions.log" }),
        new winston.transports.Console(),
    );
}