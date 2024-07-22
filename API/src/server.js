const express = require("express");
const routes = require("./routes");
const { connectDB } = require('./database/db');
const cors = require('cors');

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(routes);

async function startServer() {
    try {
        await connectDB();
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port:: ${process.env.PORT}`);
        });

    } catch (error) {
        console.error("Failed to start the server: ", error);
        process.exit(1);
    }
}

startServer();