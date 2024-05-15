const { Router } = require("express");
const routes = new Router();

routes.get("/health", (request, response) => {
    return response.send("Connected with sucsess!");
});

module.exports = routes;