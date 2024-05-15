const { Router } = require("express");
const routes = new Router();

routes.get("/health", (req, res) => {
    return res.send("Connected with sucsess!");
});

module.exports = routes;