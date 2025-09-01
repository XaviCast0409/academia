"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudySessionController = void 0;
const studySession_service_1 = __importDefault(require("./studySession.service"));
const express_validator_1 = require("express-validator");
class StudySessionController {
    // Iniciar una nueva sesión de estudio
    async startSession(req, res) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                    success: false,
                    message: "Errores de validación",
                    errors: errors.array()
                });
                return;
            }
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: "Usuario no autenticado"
                });
                return;
            }
            // Verificar si ya tiene una sesión activa
            const activeSession = await studySession_service_1.default.getActiveSession(userId);
            if (activeSession) {
                res.status(409).json({
                    success: false,
                    message: "Ya tienes una sesión activa",
                    data: { activeSessionId: activeSession.id }
                });
                return;
            }
            const { studyCardId, sessionType, sessionGoal } = req.body;
            const session = await studySession_service_1.default.startStudySession(userId, {
                studyCardId,
                sessionType,
                sessionGoal
            });
            res.status(201).json({
                success: true,
                message: "Sesión de estudio iniciada",
                data: session
            });
        }
        catch (error) {
            console.error("Error al iniciar sesión:", error);
            res.status(500).json({
                success: false,
                message: "Error interno del servidor"
            });
        }
    }
    // Finalizar una sesión de estudio
    async finishSession(req, res) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                    success: false,
                    message: "Errores de validación",
                    errors: errors.array()
                });
                return;
            }
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: "Usuario no autenticado"
                });
                return;
            }
            const { sessionId } = req.params;
            const { cardsStudied, notes } = req.body;
            const result = await studySession_service_1.default.finishStudySession(Number(sessionId), {
                cardsStudied,
                endTime: new Date(),
                notes
            });
            res.status(200).json({
                success: true,
                message: "Sesión completada exitosamente",
                data: result
            });
        }
        catch (error) {
            console.error("Error al finalizar sesión:", error);
            if (error instanceof Error) {
                if (error.message === "Sesión no encontrada") {
                    res.status(404).json({
                        success: false,
                        message: error.message
                    });
                    return;
                }
                if (error.message === "La sesión ya está completada") {
                    res.status(409).json({
                        success: false,
                        message: error.message
                    });
                    return;
                }
            }
            res.status(500).json({
                success: false,
                message: "Error interno del servidor"
            });
        }
    }
    // Registrar estudio de una tarjeta específica
    async recordCardStudy(req, res) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                    success: false,
                    message: "Errores de validación",
                    errors: errors.array()
                });
                return;
            }
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: "Usuario no autenticado"
                });
                return;
            }
            const { cardId } = req.params;
            const { sessionId } = req.body;
            const userCard = await studySession_service_1.default.recordCardStudy(userId, Number(cardId), sessionId);
            res.status(200).json({
                success: true,
                message: "Estudio de tarjeta registrado",
                data: userCard
            });
        }
        catch (error) {
            console.error("Error al registrar estudio:", error);
            res.status(500).json({
                success: false,
                message: "Error interno del servidor"
            });
        }
    }
    // Obtener historial de sesiones del usuario
    async getSessionHistory(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: "Usuario no autenticado"
                });
                return;
            }
            const { sessionType, page = 1, limit = 20, startDate, endDate } = req.query;
            const offset = (Number(page) - 1) * Number(limit);
            const filters = {
                sessionType: sessionType,
                limit: Number(limit),
                offset,
                startDate: startDate ? new Date(startDate) : undefined,
                endDate: endDate ? new Date(endDate) : undefined
            };
            const result = await studySession_service_1.default.getUserSessionHistory(userId, filters);
            res.status(200).json({
                success: true,
                data: result.rows,
                pagination: {
                    total: result.count,
                    page: Number(page),
                    limit: Number(limit),
                    totalPages: Math.ceil(result.count / Number(limit))
                }
            });
        }
        catch (error) {
            console.error("Error al obtener historial:", error);
            res.status(500).json({
                success: false,
                message: "Error interno del servidor"
            });
        }
    }
    // Obtener estadísticas de estudio del usuario
    async getStudyStatistics(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: "Usuario no autenticado"
                });
                return;
            }
            const { timeframe = "month" } = req.query;
            const stats = await studySession_service_1.default.getUserStudyStatistics(userId, timeframe);
            res.status(200).json({
                success: true,
                data: stats
            });
        }
        catch (error) {
            console.error("Error al obtener estadísticas:", error);
            res.status(500).json({
                success: false,
                message: "Error interno del servidor"
            });
        }
    }
    // Obtener sesión activa del usuario
    async getActiveSession(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: "Usuario no autenticado"
                });
                return;
            }
            const activeSession = await studySession_service_1.default.getActiveSession(userId);
            // Si no hay sesión activa, devolver 200 con null (no es un error)
            if (!activeSession) {
                res.status(200).json({
                    success: true,
                    data: null,
                    message: "No hay sesión activa"
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: activeSession
            });
        }
        catch (error) {
            console.error("Error al obtener sesión activa:", error);
            res.status(500).json({
                success: false,
                message: "Error interno del servidor"
            });
        }
    }
    // Cancelar sesión activa
    async cancelActiveSession(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: "Usuario no autenticado"
                });
                return;
            }
            const activeSession = await studySession_service_1.default.getActiveSession(userId);
            if (!activeSession) {
                res.status(200).json({
                    success: true,
                    data: null,
                    message: "No hay sesión activa para cancelar"
                });
                return;
            }
            // Marcar la sesión como completada sin recompensas
            await activeSession.update({
                endTime: new Date(),
                isCompleted: true,
                duration: 0,
                cardsStudied: 0,
                xavicoinsEarned: 0
            });
            res.status(200).json({
                success: true,
                message: "Sesión cancelada exitosamente"
            });
        }
        catch (error) {
            console.error("Error al cancelar sesión:", error);
            res.status(500).json({
                success: false,
                message: "Error interno del servidor"
            });
        }
    }
}
exports.StudySessionController = StudySessionController;
exports.default = new StudySessionController();
