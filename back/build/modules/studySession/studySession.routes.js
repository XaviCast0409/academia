"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studySession_controller_1 = __importDefault(require("./studySession.controller"));
const studySession_validation_1 = require("./studySession.validation");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Gestión de sesiones de estudio
router.post("/start", auth_middleware_1.authMiddleware, studySession_validation_1.startSessionValidation, studySession_controller_1.default.startSession);
router.put("/:sessionId/finish", auth_middleware_1.authMiddleware, studySession_validation_1.finishSessionValidation, studySession_controller_1.default.finishSession);
router.get("/active", auth_middleware_1.authMiddleware, studySession_controller_1.default.getActiveSession);
router.delete("/active", auth_middleware_1.authMiddleware, studySession_controller_1.default.cancelActiveSession);
// Registro de estudio de tarjetas
router.post("/cards/:cardId/study", auth_middleware_1.authMiddleware, studySession_validation_1.recordCardStudyValidation, studySession_controller_1.default.recordCardStudy);
// Historial y estadísticas
router.get("/history", auth_middleware_1.authMiddleware, studySession_validation_1.getSessionHistoryValidation, studySession_controller_1.default.getSessionHistory);
router.get("/statistics", auth_middleware_1.authMiddleware, studySession_validation_1.getStudyStatisticsValidation, studySession_controller_1.default.getStudyStatistics);
exports.default = router;
