// src/app.ts
import express from "express";
import cors from "cors";
import db from "./config/database";
import router from "./routes/index";
process.loadEnvFile();

const app = express();

// CORS para desarrollo: permite cualquier origen
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

const port = process.env.PORT || 3000;

// Sincronización de base de datos y levantamiento del servidor
db.sequelize.sync({ alter: true }).then(() => {
  app.listen(port, () => {
    console.log("🚀 Campus virtual corriendo en el puerto 3000");
  });
});
