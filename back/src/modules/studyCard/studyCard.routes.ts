import { Router } from "express";
import studyCardController from "./studyCard.controller";
import {
  createStudyCardValidation,
  updateStudyCardValidation,
  getStudyCardsValidation,
  getCardByIdValidation,
  toggleFavoriteValidation,
  getRecommendedValidation
} from "./studyCard.validation";

const router = Router();

// Rutas públicas (requieren autenticación básica)
router.get(
  "/",
  getStudyCardsValidation,
  studyCardController.getAllStudyCards
);

router.get(
  "/recommended",
  getRecommendedValidation,
  studyCardController.getRecommendedCards
);

router.get(
  "/progress",
  studyCardController.getUserProgress
);

router.get(
  "/favorites",
  studyCardController.getUserFavorites
);

router.get(
  "/:id",
  getCardByIdValidation,
  studyCardController.getStudyCardById
);

router.get(
  "/:id/statistics",
  getCardByIdValidation,
  studyCardController.getCardStatistics
);

// Rutas para gestión de favoritos
router.post(
  "/:cardId/favorite",
  toggleFavoriteValidation,
  studyCardController.toggleFavorite
);

// Rutas administrativas (requieren permisos de profesor/admin)
router.post(
  "/",
  createStudyCardValidation,
  studyCardController.createStudyCard
);

router.put(
  "/:id",
  updateStudyCardValidation,
  studyCardController.updateStudyCard
);

router.delete(
  "/:id",
  getCardByIdValidation,
  studyCardController.deleteStudyCard
);

export default router;
