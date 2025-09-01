"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudyCardController = void 0;
const studyCard_service_1 = __importDefault(require("./studyCard.service"));
const express_validator_1 = require("express-validator");
class StudyCardController {
    // Obtener todas las tarjetas con filtros
    async getAllStudyCards(req, res) {
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
            const { category, mathTopic, difficulty, search, page = 1, limit = 20 } = req.query;
            const offset = (Number(page) - 1) * Number(limit);
            const result = await studyCard_service_1.default.getAllStudyCards({
                category: category,
                mathTopic: mathTopic,
                difficulty: difficulty,
                search: search,
                limit: Number(limit),
                offset
            });
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
            console.error("Error al obtener tarjetas:", error);
            res.status(500).json({
                success: false,
                message: "Error interno del servidor"
            });
        }
    }
    // Obtener una tarjeta por ID
    async getStudyCardById(req, res) {
        try {
            const { id } = req.params;
            const card = await studyCard_service_1.default.getStudyCardById(Number(id));
            if (!card) {
                res.status(404).json({
                    success: false,
                    message: "Tarjeta no encontrada"
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: card
            });
        }
        catch (error) {
            console.error("Error al obtener tarjeta:", error);
            res.status(500).json({
                success: false,
                message: "Error interno del servidor"
            });
        }
    }
    // Crear una nueva tarjeta (solo admin/profesor)
    async createStudyCard(req, res) {
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
            const cardData = req.body;
            const newCard = await studyCard_service_1.default.createStudyCard(cardData);
            res.status(201).json({
                success: true,
                message: "Tarjeta creada exitosamente",
                data: newCard
            });
        }
        catch (error) {
            console.error("Error al crear tarjeta:", error);
            res.status(500).json({
                success: false,
                message: "Error interno del servidor"
            });
        }
    }
    // Actualizar una tarjeta
    async updateStudyCard(req, res) {
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
            const { id } = req.params;
            const updateData = req.body;
            const updatedCard = await studyCard_service_1.default.updateStudyCard(Number(id), updateData);
            res.status(200).json({
                success: true,
                message: "Tarjeta actualizada exitosamente",
                data: updatedCard
            });
        }
        catch (error) {
            console.error("Error al actualizar tarjeta:", error);
            if (error instanceof Error && error.message === "Tarjeta de estudio no encontrada") {
                res.status(404).json({
                    success: false,
                    message: error.message
                });
                return;
            }
            res.status(500).json({
                success: false,
                message: "Error interno del servidor"
            });
        }
    }
    // Eliminar una tarjeta (soft delete)
    async deleteStudyCard(req, res) {
        try {
            const { id } = req.params;
            await studyCard_service_1.default.deleteStudyCard(Number(id));
            res.status(200).json({
                success: true,
                message: "Tarjeta eliminada exitosamente"
            });
        }
        catch (error) {
            console.error("Error al eliminar tarjeta:", error);
            if (error instanceof Error && error.message === "Tarjeta de estudio no encontrada") {
                res.status(404).json({
                    success: false,
                    message: error.message
                });
                return;
            }
            res.status(500).json({
                success: false,
                message: "Error interno del servidor"
            });
        }
    }
    // Obtener tarjetas favoritas del usuario autenticado
    async getUserFavorites(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: "Usuario no autenticado"
                });
                return;
            }
            const { page = 1, limit = 20 } = req.query;
            const offset = (Number(page) - 1) * Number(limit);
            const result = await studyCard_service_1.default.getUserFavoriteCards(userId, {
                limit: Number(limit),
                offset
            });
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
            console.error("Error al obtener favoritos:", error);
            res.status(500).json({
                success: false,
                message: "Error interno del servidor"
            });
        }
    }
    // Marcar/desmarcar como favorita
    async toggleFavorite(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: "Usuario no autenticado"
                });
                return;
            }
            const { cardId } = req.params;
            const userCard = await studyCard_service_1.default.toggleFavoriteCard(userId, Number(cardId));
            res.status(200).json({
                success: true,
                message: userCard.isFavorite ? "Agregada a favoritos" : "Removida de favoritos",
                data: { isFavorite: userCard.isFavorite }
            });
        }
        catch (error) {
            console.error("Error al cambiar favorito:", error);
            res.status(500).json({
                success: false,
                message: "Error interno del servidor"
            });
        }
    }
    // Obtener progreso del usuario
    async getUserProgress(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: "Usuario no autenticado"
                });
                return;
            }
            const progress = await studyCard_service_1.default.getUserStudyProgress(userId);
            res.status(200).json({
                success: true,
                data: progress
            });
        }
        catch (error) {
            console.error("Error al obtener progreso:", error);
            res.status(500).json({
                success: false,
                message: "Error interno del servidor"
            });
        }
    }
    // Obtener estadísticas de una tarjeta
    async getCardStatistics(req, res) {
        try {
            const { id } = req.params;
            const stats = await studyCard_service_1.default.getCardStatistics(Number(id));
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
    // Obtener tarjetas recomendadas
    async getRecommendedCards(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: "Usuario no autenticado"
                });
                return;
            }
            const { limit = 10 } = req.query;
            const recommendations = await studyCard_service_1.default.getRecommendedCards(userId, Number(limit));
            res.status(200).json({
                success: true,
                data: recommendations
            });
        }
        catch (error) {
            console.error("Error al obtener recomendaciones:", error);
            res.status(500).json({
                success: false,
                message: "Error interno del servidor"
            });
        }
    }
}
exports.StudyCardController = StudyCardController;
exports.default = new StudyCardController();
