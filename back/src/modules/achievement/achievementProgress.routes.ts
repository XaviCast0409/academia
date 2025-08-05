import { Router } from 'express';
import {
  updateProgressFromActivityController,
  updateProgressFromLevelUpController,
  updateProgressFromStreakController,
  updateProgressFromCoinsController,
  updateProgressFromRankingController,
  updateProgressFromActionController,
  forceUpdateAllUserAchievementsController,
  getUserAchievementProgressController,
  debugUserAchievementsController
} from './achievementProgress.controller';

const routerAchievementProgress = Router();

// ====== RUTAS DE ACTUALIZACIÓN DE PROGRESO ======

// Actualizar progreso por actividad completada
routerAchievementProgress.post('/activity/:userId', updateProgressFromActivityController);

// Actualizar progreso por subida de nivel
routerAchievementProgress.post('/level/:userId', updateProgressFromLevelUpController);

// Actualizar progreso por racha de días
routerAchievementProgress.post('/streak/:userId', updateProgressFromStreakController);

// Actualizar progreso por XaviCoins ganadas
routerAchievementProgress.post('/coins/:userId', updateProgressFromCoinsController);

// Actualizar progreso por ranking
routerAchievementProgress.post('/ranking/:userId', updateProgressFromRankingController);

// Función principal para actualizar progreso desde cualquier acción
routerAchievementProgress.post('/action/:userId', updateProgressFromActionController);

// ====== RUTAS DE DEBUGGING Y CONSULTA ======

// Forzar actualización de todos los logros de un usuario (para debugging)
routerAchievementProgress.post('/force-update/:userId', forceUpdateAllUserAchievementsController);

// Obtener progreso detallado de logros de un usuario
routerAchievementProgress.get('/progress/:userId', getUserAchievementProgressController);

// Debug endpoint para verificar estado de logros
routerAchievementProgress.get('/debug/:userId', debugUserAchievementsController);

export default routerAchievementProgress; 