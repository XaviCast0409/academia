import { Request, Response } from "express";
import courseService from "./course.service";

export class CourseController {

  // Obtener todos los cursos
  async getAllCourses(req: Request, res: Response): Promise<void> {
    try {
      const courses = await courseService.getAllCourses();
      
      res.status(200).json({
        success: true,
        data: courses
      });
    } catch (error) {
      console.error("Error al obtener cursos:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error interno del servidor" 
      });
    }
  }

  // Obtener un curso por ID
  async getCourseById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const course = await courseService.getCourseById(Number(id));
      
      if (!course) {
        res.status(404).json({ 
          success: false, 
          message: "Curso no encontrado" 
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: course
      });
    } catch (error) {
      console.error("Error al obtener curso:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error interno del servidor" 
      });
    }
  }

  // Crear un nuevo curso (solo administradores)
  async createCourse(req: Request, res: Response): Promise<void> {
    try {
      const courseData = req.body;
      const course = await courseService.createCourse(courseData);
      
      res.status(201).json({
        success: true,
        message: "Curso creado exitosamente",
        data: course
      });
    } catch (error) {
      console.error("Error al crear curso:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error interno del servidor" 
      });
    }
  }

  // Actualizar un curso
  async updateCourse(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const courseData = req.body;
      const course = await courseService.updateCourse(Number(id), courseData);
      
      res.status(200).json({
        success: true,
        message: "Curso actualizado exitosamente",
        data: course
      });
    } catch (error) {
      console.error("Error al actualizar curso:", error);
      if (error instanceof Error && error.message === 'Curso no encontrado') {
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

  // Eliminar un curso
  async deleteCourse(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await courseService.deleteCourse(Number(id));
      
      res.status(200).json({
        success: true,
        message: "Curso eliminado exitosamente"
      });
    } catch (error) {
      console.error("Error al eliminar curso:", error);
      if (error instanceof Error && error.message === 'Curso no encontrado') {
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

  // Obtener estadísticas de un curso
  async getCourseStats(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const stats = await courseService.getCourseStats(Number(id));
      
      res.status(200).json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error("Error al obtener estadísticas del curso:", error);
      if (error instanceof Error && error.message === 'Curso no encontrado') {
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
}

export default new CourseController();
