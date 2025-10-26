import { Router } from "express";
import studySessionController from "./studySession.controller";
import { optionalAuthMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

// Permitir token opcional: si viene, se attachará req.user; si no, se permite el acceso
router.use(optionalAuthMiddleware);

// Rutas de sesiones de estudio (requieren autenticación)
router.post("/start", studySessionController.startStudySession);
router.post("/:sessionId/end", studySessionController.endStudySession);
router.get("/user", studySessionController.getUserSessions);
router.get("/user/stats", studySessionController.getUserStudyStats);
router.get("/user/active", studySessionController.getActiveSession);
router.delete("/user/active", studySessionController.cancelActiveSession);
router.get("/:sessionId", studySessionController.getSessionById);
router.post('/user/:userId/add-rewards', studySessionController.addRewardsToUser);

export default router;
