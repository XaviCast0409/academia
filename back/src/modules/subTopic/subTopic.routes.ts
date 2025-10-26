import { Router } from "express";
import subTopicController from "./subTopic.controller";

const router = Router();

// Rutas públicas
router.get("/course/:courseId", subTopicController.getSubTopicsByCourse);
router.get("/:id", subTopicController.getSubTopicById);
router.get("/:id/stats", subTopicController.getSubTopicStats);

// Rutas de administración
router.post("/", subTopicController.createSubTopic);
router.put("/:id", subTopicController.updateSubTopic);
router.delete("/:id", subTopicController.deleteSubTopic);

export default router;
