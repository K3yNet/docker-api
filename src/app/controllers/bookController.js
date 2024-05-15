const bookModel = require("../models/bookModel");

class bookController {
    async store(req, res) {
        const createdBook = await bookModel.create(req.body);

        return res.send(createdBook);
    }

    async index() {

    }

    async show() {

    }

    async update() {

    }

    async destroy() {

    }
}

module.exports = new bookController();