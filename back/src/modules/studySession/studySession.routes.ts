import { Router } from "express";
import studySessionController from "./studySession.controller";
import {
  startSessionValidation,
  finishSessionValidation,
  recordCardStudyValidation,
  getSessionHistoryValidation,
  getStudyStatisticsValidation
} from "./studySession.validation";

const router = Router();

// Gestión de sesiones de estudio
router.post(
  "/start",
  startSessionValidation,
  studySessionController.startSession
);

router.put(
  "/:sessionId/finish",
  finishSessionValidation,
  studySessionController.finishSession
);

router.get(
  "/active",
  studySessionController.getActiveSession
);

router.delete(
  "/active",
  studySessionController.cancelActiveSession
);

// Registro de estudio de tarjetas
router.post(
  "/cards/:cardId/study",
  recordCardStudyValidation,
  studySessionController.recordCardStudy
);

// Historial y estadísticas
router.get(
  "/history",
  getSessionHistoryValidation,
  studySessionController.getSessionHistory
);

router.get(
  "/statistics",
  getStudyStatisticsValidation,
  studySessionController.getStudyStatistics
);

export default router;
