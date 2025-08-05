import { Router } from "express";
import {
  getAchievementsForUserController,
  claimAchievementRewardController,
  checkAndUpdateAchievementsController,
  getAchievementProgressController,
  getAllAchievementsController,
  assignAllAchievementsController,
  updateAchievementProgressController
} from "./achievement.controller";
import routerAchievementProgress from "./achievementProgress.routes";

const routerAchievement = Router();

routerAchievement.get("/", getAllAchievementsController);
routerAchievement.get("/user", getAchievementsForUserController);
routerAchievement.post("/:id/claim", claimAchievementRewardController);
routerAchievement.post("/check", checkAndUpdateAchievementsController);
routerAchievement.get("/progress", getAchievementProgressController);

// Nuevas rutas para asignación automática
routerAchievement.post("/assign/:userId", assignAllAchievementsController);
routerAchievement.post("/update-progress", updateAchievementProgressController);

// Ruta de debug para ver progreso detallado (temporalmente comentada)
// routerAchievement.get("/debug/user/:userId", debugUserAchievementsController);

// Incluir rutas de progreso de logros
routerAchievement.use("/progress", routerAchievementProgress);

export default routerAchievement;
