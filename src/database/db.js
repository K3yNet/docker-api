const { MongoClient } = require('mongodb');
require('dotenv').config();

let singleton;

async function connectDB() {
    if (singleton) {
        return singleton;
    }

    try {
        const client = new MongoClient(process.env.MONGO_HOST);
        await client.connect();
        singleton = client.db(process.env.MONGO_DATABASE);
        console.log("Connection to MongoDB established successfully.");
        return singleton;
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        throw error; // Propaga o erro para cima para que o chamador possa tratá-lo
    }
}

async function disconnectDB() {
    if (singleton) {
        await singleton.client.close();
        singleton = null;
        console.log("Connection to MongoDB closed.");
    }
}

module.exports = { connectDB, disconnectDB };