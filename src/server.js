const { connectDB } = require('./src/configs/db');
const express = require("express");
const routes = require("./routes");
const app = express();

require("dotenv").config();

app.use(express.json()); // Habilita o middleware para parsear JSON
app.use(routes); // Adiciona as rotas ao aplicativo Express

async function startServer() {
    try {
        await connectDB();  // Assegura que a conexão com o banco está pronta
        app.listen(process.env.PORT, () => {
            console.log(`Servidor rodando na porta: ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("Falha ao conectar com o banco de dados: ", error);
        process.exit(1);  // Encerra a aplicação se a conexão com o banco falhar
    }
}

startServer();