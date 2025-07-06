const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Book, validate } = require("../models/book");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const books = await Book.find();
    res.send(books);
});

router.get("/:id", async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        return res.status(404).send("book not found");
    }
    res.send(book);
});

router.post("/", auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let book = new Book({ name: req.body.name, numberInStock: req.body.numberInStock });
    book = await book.save();
    res.send(book);
});

router.put("/:id", async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const book = await Book.findByIdAndUpdate(req.params.id, {
        $set: { name: req.body.name, numberInStock: req.body.numberInStock }
    }, { new: true });

    if (!book) {
        return res.status(404).send("book not found");
    }

    res.send(book);
});

router.delete("/:id", [auth, admin], async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
        return res.status(404).send("book not found");
    }
    res.send(book);
});

module.exports = router;