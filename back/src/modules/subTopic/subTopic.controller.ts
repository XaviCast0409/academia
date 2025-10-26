import { Request, Response } from "express";
import subTopicService from "./subTopic.service";

export class SubTopicController {

  // Obtener subtemas de un curso
  async getSubTopicsByCourse(req: Request, res: Response): Promise<void> {
    try {
      const { courseId } = req.params;
      const subTopics = await subTopicService.getSubTopicsByCourse(Number(courseId));
      
      res.status(200).json({
        success: true,
        data: subTopics
      });
    } catch (error) {
      console.error("Error al obtener subtemas:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error interno del servidor" 
      });
    }
  }

  // Obtener un subtema por ID
  async getSubTopicById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const subTopic = await subTopicService.getSubTopicById(Number(id));
      
      if (!subTopic) {
        res.status(404).json({ 
          success: false, 
          message: "Subtema no encontrado" 
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: subTopic
      });
    } catch (error) {
      console.error("Error al obtener subtema:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error interno del servidor" 
      });
    }
  }

  // Crear un nuevo subtema
  async createSubTopic(req: Request, res: Response): Promise<void> {
    try {
      const subTopicData = req.body;
      const subTopic = await subTopicService.createSubTopic(subTopicData);
      
      res.status(201).json({
        success: true,
        message: "Subtema creado exitosamente",
        data: subTopic
      });
    } catch (error) {
      console.error("Error al crear subtema:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error interno del servidor" 
      });
    }
  }

  // Actualizar un subtema
  async updateSubTopic(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const subTopicData = req.body;
      const subTopic = await subTopicService.updateSubTopic(Number(id), subTopicData);
      
      res.status(200).json({
        success: true,
        message: "Subtema actualizado exitosamente",
        data: subTopic
      });
    } catch (error) {
      console.error("Error al actualizar subtema:", error);
      if (error instanceof Error && error.message === 'Subtema no encontrado') {
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

  // Eliminar un subtema
  async deleteSubTopic(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await subTopicService.deleteSubTopic(Number(id));
      
      res.status(200).json({
        success: true,
        message: "Subtema eliminado exitosamente"
      });
    } catch (error) {
      console.error("Error al eliminar subtema:", error);
      if (error instanceof Error && error.message === 'Subtema no encontrado') {
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

  // Obtener estadísticas de un subtema
  async getSubTopicStats(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const stats = await subTopicService.getSubTopicStats(Number(id));
      
      res.status(200).json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error("Error al obtener estadísticas del subtema:", error);
      if (error instanceof Error && error.message === 'Subtema no encontrado') {
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

export default new SubTopicController();
