const { Router } = require("express");
const routes = new Router();

const bookController = require("./app/controllers/bookController");

routes.get("/health", (req, res) => {
    return res.send("Connected with sucsess!");
});

routes.post("/book", bookController.store);

module.exports = routes;