const mongoose = require("mongoose");
require("dotenv").config();

let singleton;

async function connectDB() {
    if (singleton) {
        return singleton;
    }

    try {
        await mongoose.connect(process.env.MONGO_HOST, {
            dbName: process.env.MONGO_DATABASE,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        singleton = mongoose.connection;
        console.log("Connection to MongoDB established successfully.");
        return singleton;
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        throw error; // Propagates the error upwards so that the caller can handle it
    }
}

async function disconnectDB() {
    if (singleton) {
        await mongoose.disconnect();
        singleton = null;
        console.log("Connection to MongoDB closed.");
    }
}

module.exports = { connectDB, disconnectDB };