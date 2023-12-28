/* eslint-disable no-undef */
const express = require("express");

const rotas = require("./routes");

const database = require("./src/Database/conn");

const PORT = process.env.PORT || 8000;

const app = express();

const cors = require("cors");

const allowedOrigins = [
  "https://maoamiga.azurewebsites.net",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(async (req, res, next) => {
  try {
    await database();

    next();
  } catch (error) {
    console.error("Error in initial database configuration.:", error);

    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
});

app.use(express.json());
app.use(rotas);

app.listen(PORT, () => {
  console.log(`Server on router ${PORT}`);
});
