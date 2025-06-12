"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./config/database"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
// CORS para desarrollo: permite cualquier origen
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(index_1.default);
app.get("/", (req, res) => {
    res.send("¡Hola, mundo!");
});
// Sincronización de base de datos y levantamiento del servidor
database_1.default.sequelize.sync({ alter: true }).then(() => {
    app.listen(3000, () => {
        console.log("🚀 Campus virtual corriendo en el puerto 3000");
    });
});
