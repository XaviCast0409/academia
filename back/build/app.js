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
const achievement_seeder_1 = require("./modules/achievement/achievement.seeder");
const mission_seeder_1 = require("./modules/mission/mission.seeder");
const scheduler_1 = __importDefault(require("./utils/scheduler"));
const http_1 = require("http");
const socket_1 = require("./realtime/socket");
process.loadEnvFile();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
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
const port = process.env.PORT || 3000;
// Sincronización de base de datos y levantamiento del servidor
database_1.default.sequelize.sync({ alter: true }).then(async () => {
    try {
        // Verificar y crear logros si la tabla está vacía
        await (0, achievement_seeder_1.seedAchievementsIfEmpty)();
        // Verificar y crear misiones si la tabla está vacía
        await (0, mission_seeder_1.seedMissionsIfEmpty)();
        // Inicializar el programador de misiones automáticas
        const missionScheduler = scheduler_1.default.getInstance();
        missionScheduler.initialize();
        const portNumber = typeof port === 'string' ? parseInt(port, 10) : port;
        // Inicializar Socket.IO
        (0, socket_1.initializeSocketServer)(httpServer);
        console.log('Socket.IO: Server initialized');
        httpServer.listen(portNumber, '0.0.0.0', () => {
            console.log(`Servidor corriendo en el puerto ${portNumber}`);
        });
    }
    catch (error) {
        console.error("❌ Error durante la inicialización:", error);
        process.exit(1);
    }
});
