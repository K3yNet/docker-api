const BookModel = require("../models/BookModel");

class BookController {
    async store(req, res) {
        const createdBook = await BookModel.create(req.body);

        return res.send(createdBook);
    }

    async index(req, res) {
        const books = await BookModel.find();

        return res.send(books);
    }

    async show() {

    }

    async update() {

    }

    async destroy() {

    }
}

module.exports = new BookController();