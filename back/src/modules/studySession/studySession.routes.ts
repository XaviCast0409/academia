import { Router } from "express";
import studySessionController from "./studySession.controller";
import {
  startSessionValidation,
  finishSessionValidation,
  recordCardStudyValidation,
  getSessionHistoryValidation,
  getStudyStatisticsValidation
} from "./studySession.validation";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

// Gestión de sesiones de estudio
router.post(
  "/start",
  authMiddleware,
  startSessionValidation,
  studySessionController.startSession
);

router.put(
  "/:sessionId/finish",
  authMiddleware,
  finishSessionValidation,
  studySessionController.finishSession
);

router.get(
  "/active",
  authMiddleware,
  studySessionController.getActiveSession
);

router.delete(
  "/active",
  authMiddleware,
  studySessionController.cancelActiveSession
);

// Registro de estudio de tarjetas
router.post(
  "/cards/:cardId/study",
  authMiddleware,
  recordCardStudyValidation,
  studySessionController.recordCardStudy
);

// Historial y estadísticas
router.get(
  "/history",
  authMiddleware,
  getSessionHistoryValidation,
  studySessionController.getSessionHistory
);

router.get(
  "/statistics",
  authMiddleware,
  getStudyStatisticsValidation,
  studySessionController.getStudyStatistics
);

export default router;
