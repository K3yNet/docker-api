const BookModel = require("../models/bookModel");

class BookController {
    async store(req, res) {
        try {
            const createdBook = await BookModel.create(req.body);
            return res.status(201).json(createdBook);
        } catch (error) {
            return res.status(400).json({ message: "Error creating book", error });
        }
    }

    async index(req, res) {
        try {
            const books = await BookModel.find();
            return res.status(200).json(books);
        } catch (error) {
            return res.status(500).json({ message: "Error fetching books", error });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const book = await BookModel.findById(id);

            if (!book) {
                return res.status(404).json({ message: "No book found!" });
            }
            return res.status(200).json(book);
        } catch (error) {
            return res.status(500).json({ message: "Error finding the book", error });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const book = await BookModel.findByIdAndUpdate(id, req.body, { new: true });

            if (!book) {
                return res.status(404).json({ message: "No book found" });
            }
            return res.status(200).json(book);
        } catch (error) {
            return res.status(400).json({ message: "Error updating book", error });
        }
    }

    async destroy(req, res) {
        try {
            const { id } = req.params;
            const book = await BookModel.findByIdAndDelete(id);

            if (!book) {
                return res.status(404).json({ message: "No book found" });
            }
            return res.status(204).json();
        } catch (error) {
            return res.status(500).json({ message: "Error deleting book", error });
        }
    }
}

module.exports = new BookController();
