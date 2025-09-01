"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studyCard_controller_1 = __importDefault(require("./studyCard.controller"));
const studyCard_validation_1 = require("./studyCard.validation");
const router = (0, express_1.Router)();
// Rutas públicas (requieren autenticación básica)
router.get("/", studyCard_validation_1.getStudyCardsValidation, studyCard_controller_1.default.getAllStudyCards);
router.get("/recommended", studyCard_validation_1.getRecommendedValidation, studyCard_controller_1.default.getRecommendedCards);
router.get("/progress", studyCard_controller_1.default.getUserProgress);
router.get("/favorites", studyCard_controller_1.default.getUserFavorites);
router.get("/:id", studyCard_validation_1.getCardByIdValidation, studyCard_controller_1.default.getStudyCardById);
router.get("/:id/statistics", studyCard_validation_1.getCardByIdValidation, studyCard_controller_1.default.getCardStatistics);
// Rutas para gestión de favoritos
router.post("/:cardId/favorite", studyCard_validation_1.toggleFavoriteValidation, studyCard_controller_1.default.toggleFavorite);
// Rutas administrativas (requieren permisos de profesor/admin)
router.post("/", studyCard_validation_1.createStudyCardValidation, studyCard_controller_1.default.createStudyCard);
router.put("/:id", studyCard_validation_1.updateStudyCardValidation, studyCard_controller_1.default.updateStudyCard);
router.delete("/:id", studyCard_validation_1.getCardByIdValidation, studyCard_controller_1.default.deleteStudyCard);
exports.default = router;
