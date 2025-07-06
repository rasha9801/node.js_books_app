const mongoose = require("mongoose");
const Joi = require("joi");

const Book = mongoose.model("Book", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 1000
    }
}));

function validateBook(book) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        numberInStock: Joi.number().min(0).required()
    });

    return schema.validate(book);
}

module.exports.Book = Book;
module.exports.validate = validateBook;