const { Router } = require("express");
const routes = new Router();

const BookController = require("./app/controllers/BookController");

routes.get("/health", (req, res) => {
    return res.send("Connected with sucsess!");
});

routes.post("/book", BookController.store);
routes.get("/book", BookController.index);

module.exports = routes;