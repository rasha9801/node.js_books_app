const mongoose = require("mongoose");
const Joi = require("joi");

const Rental = mongoose.model("Rental", new mongoose.Schema({
    customer: new mongoose.Schema({
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 100
        },
        isVip: {
            type: Boolean,
            default: false
        }
    }),
    book: new mongoose.Schema({
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 100
        }
    }),
    dateOut: {
        required: true,
        type: Date,
        default: Date.now
    },
    dateReturned: Date,
    rentalCost: {
        type: Number,
        min: 0
    }
}));

function validateRental(rental) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        bookId: Joi.objectId().required()
    });

    return schema.validate(rental);
}

module.exports.Rental = Rental;
module.exports.validate = validateRental;