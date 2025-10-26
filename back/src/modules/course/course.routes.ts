import { Router } from "express";
import courseController from "./course.controller";

const router = Router();

// Rutas públicas
router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.get("/:id/stats", courseController.getCourseStats);

// Rutas de administración
router.post("/", courseController.createCourse);
router.put("/:id", courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);

export default router;
