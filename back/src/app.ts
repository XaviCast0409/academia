// src/app.ts
import express from "express";
import cors from "cors";
import db from "./config/database";
import router from "./routes/index";
import { seedAchievementsIfEmpty } from "./modules/achievement/achievement.seeder";
import { seedMissionsIfEmpty } from "./modules/mission/mission.seeder";
import { seedCoursesAndCardsIfEmpty } from "./modules/course/course.seeder";
import MissionScheduler from "./utils/scheduler";
import { createServer } from 'http';
import { initializeSocketServer } from './realtime/socket';
process.loadEnvFile();

const app = express();
const httpServer = createServer(app);

// CORS para desarrollo: permite cualquier origen
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usar las rutas directamente sin prefijo
app.use(router);
  
app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

const port = process.env.PORT || 3000;

// Sincronización de base de datos y levantamiento del servidor
db.sequelize.sync({ alert: true }).then(async () => {
  try {
    // Verificar y crear logros si la tabla está vacía
    await seedAchievementsIfEmpty();
    
    // Verificar y crear misiones si la tabla está vacía
    await seedMissionsIfEmpty();
    
    // Verificar y crear cursos, subtemas y cartas de ejemplo si las tablas están vacías
    await seedCoursesAndCardsIfEmpty();

    // Inicializar el programador de misiones automáticas
    const missionScheduler = MissionScheduler.getInstance();
    missionScheduler.initialize();

    const portNumber = typeof port === 'string' ? parseInt(port, 10) : port;

    // Inicializar Socket.IO
    initializeSocketServer(httpServer);
    console.log('Socket.IO: Server initialized');

    httpServer.listen(portNumber, '0.0.0.0', () => {
      console.log(`Servidor corriendo en el puerto ${portNumber}`);
    });
  } catch (error) {
    console.error("❌ Error durante la inicialización:", error);
    process.exit(1);
  }
});
