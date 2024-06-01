const express = require("express");
const routes = require("./routes");
const { connectDB } = require('./database/db');

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(routes);

async function startServer() {
    try {
        await connectDB();
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port: ${process.env.PORT}`);
        });

    } catch (error) {
        console.error("Failed to start the server: ", error);
        process.exit(1);
    }
}

startServer();

module.exports = { app, startServer };


