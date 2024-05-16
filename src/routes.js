const { Router } = require("express");
const routes = new Router();

const BookController = require("./app/controllers/bookController");

routes.get("/health", (req, res) => {
    return res.send("Connected with sucsess!");
});

routes.post("/book", BookController.store);
routes.get("/books", BookController.index);
routes.get("/books/:id", BookController.show);
routes.put("/books/:id", BookController.update);
routes.delete("/books/:id", BookController.destroy);

module.exports = routes;