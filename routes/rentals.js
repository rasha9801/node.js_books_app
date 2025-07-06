const mongoose = require("mongoose");
const { Rental, validate } = require("../models/rental");
const { Customer } = require("../models/customer");
const { Book } = require("../models/book");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const rentals = await Rental.find();
    res.send(rentals);
});

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let customer = await Customer.findById(req.body.customerId);
    if (!customer) {
        return res.status(404).send("customer not found");
    }

    let book = await Book.findById(req.body.bookId);
    if (!book) {
        return res.status(404).send("book not found");
    }

    let rental = new Rental({
        customer: {
            _id: customer.id,
            name: customer.name,
            isVip: customer.isVip
        },
        book: {
            _id: book.id,
            name: book.name
        }
    });

    const session = await mongoose.startSession();
    session.startTransaction();

    rental = await rental.save({ session: session });

    book.numberInStock--;
    await book.save({ session: session });

    await session.commitTransaction();
    await session.endSession();
    
    res.send(rental);
});

module.exports = router;