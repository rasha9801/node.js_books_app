const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model("Customer", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    phone: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    isVip: {
        type: Boolean,
        default: false
    }
}));

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        phone: Joi.string().min(3).max(100).required(),
        isVip: Joi.boolean()
    });

    return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;