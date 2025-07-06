const winston = require("winston");

module.exports = async (err, req, res, next) => {
    winston.error(err.message, err);
    return res.status(500).send("Something went wrong");
}