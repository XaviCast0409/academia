import { Router } from "express";
import studyCardController from "./studyCard.controller";
import { optionalAuthMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

// Ruta pública para listar todas las cartas (opcional: ?limit & ?page)
router.get('/', studyCardController.getAllCards);

// Rutas públicas
router.get("/subtopic/:subTopicId", studyCardController.getCardsBySubTopic);
router.get("/:id", studyCardController.getCardById);
router.get("/subtopic/:subTopicId/study", studyCardController.getCardsForStudy);

// Rutas de usuario (requieren autenticación)
router.get("/user/favorites", studyCardController.getUserFavoriteCards);
router.post("/:cardId/favorite", studyCardController.toggleFavorite);
router.post("/:cardId/study", studyCardController.recordCardStudy);

// Rutas de administración
router.post("/", studyCardController.createCard);
router.put("/:id", studyCardController.updateCard);
router.delete("/:id", studyCardController.deleteCard);

export default router;
