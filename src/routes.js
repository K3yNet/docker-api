const { Router } = require("express");
const routes = new Router();

const BookController = require("./app/controllers/bookController");

// Health Check
routes.get("/health", (req, res) => res.send("Connected with success!"));

// Book Routes
routes.post("/books", BookController.store);
routes.get("/books", BookController.index);
routes.get("/books/:id", BookController.show);
routes.put("/books/:id", BookController.update);
routes.delete("/books/:id", BookController.destroy);

module.exports = routes;