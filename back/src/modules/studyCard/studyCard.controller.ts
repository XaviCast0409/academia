import { Request, Response } from "express";
import studyCardService from "./studyCard.service";

export class StudyCardController {

  // Obtener cartas de un subtema
  async getCardsBySubTopic(req: Request, res: Response): Promise<void> {
    try {
      const { subTopicId } = req.params;
      const userId = (req as any).user?.id; // Obtener ID del usuario autenticado
      
      const cards = await studyCardService.getCardsBySubTopic(Number(subTopicId), userId);
      
      res.status(200).json({
        success: true,
        data: cards
      });
    } catch (error) {
      console.error("Error al obtener cartas:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error interno del servidor" 
      });
    }
  }

  // Obtener una carta por ID
  async getCardById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user?.id;
      
      const card = await studyCardService.getCardById(Number(id), userId);
      
      if (!card) {
        res.status(404).json({ 
          success: false, 
          message: "Carta no encontrada" 
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: card
      });
    } catch (error) {
      console.error("Error al obtener carta:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error interno del servidor" 
      });
    }
  }

  // Crear una nueva carta (solo administradores)
  async createCard(req: Request, res: Response): Promise<void> {
    try {
      const cardData = req.body;
      const card = await studyCardService.createCard(cardData);
      
      res.status(201).json({
        success: true,
        message: "Carta creada exitosamente",
        data: card
      });
    } catch (error) {
      console.error("Error al crear carta:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error interno del servidor" 
      });
    }
  }

  // Actualizar una carta
  async updateCard(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const cardData = req.body;
      const card = await studyCardService.updateCard(Number(id), cardData);
      
      res.status(200).json({
        success: true,
        message: "Carta actualizada exitosamente",
        data: card
      });
    } catch (error) {
      console.error("Error al actualizar carta:", error);
      if (error instanceof Error && error.message === 'Carta no encontrada') {
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

  // Eliminar una carta
  async deleteCard(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await studyCardService.deleteCard(Number(id));
      
      res.status(200).json({
        success: true,
        message: "Carta eliminada exitosamente"
      });
    } catch (error) {
      console.error("Error al eliminar carta:", error);
      if (error instanceof Error && error.message === 'Carta no encontrada') {
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

  // Obtener cartas favoritas del usuario
  async getUserFavoriteCards(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ 
          success: false, 
          message: "Usuario no autenticado" 
        });
        return;
      }

      const cards = await studyCardService.getUserFavoriteCards(userId);
      
      res.status(200).json({
        success: true,
        data: cards
      });
    } catch (error) {
      console.error("Error al obtener cartas favoritas:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error interno del servidor" 
      });
    }
  }

  // Marcar/desmarcar carta como favorita
  async toggleFavorite(req: Request, res: Response): Promise<void> {
    try {
      const { cardId } = req.params;
      const userId = (req as any).user?.id;
      
      if (!userId) {
        res.status(401).json({ 
          success: false, 
          message: "Usuario no autenticado" 
        });
        return;
      }

      const userCard = await studyCardService.toggleFavorite(userId, Number(cardId));
      
      res.status(200).json({
        success: true,
        message: userCard.isFavorite ? "Carta marcada como favorita" : "Carta removida de favoritos",
        data: userCard
      });
    } catch (error) {
      console.error("Error al cambiar favorito:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error interno del servidor" 
      });
    }
  }

  // Registrar estudio de una carta
  async recordCardStudy(req: Request, res: Response): Promise<void> {
    try {
      const { cardId } = req.params;
      const userId = (req as any).user?.id;

      if (!userId) {
        // Usuario anónimo: no guardamos progreso por usuario, pero permitimos continuar
        // Retornar 200 para no interrumpir el flujo del estudio en cliente
        res.status(200).json({
          success: true,
          message: 'Estudio registrado (anónimo)'
        });
        return;
      }

      const userCard = await studyCardService.recordCardStudy(userId, Number(cardId));

      res.status(200).json({
        success: true,
        message: "Estudio registrado exitosamente",
        data: userCard
      });
    } catch (error) {
      console.error("Error al registrar estudio:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error interno del servidor" 
      });
    }
  }

  // Obtener cartas para estudio (mezcladas)
  async getCardsForStudy(req: Request, res: Response): Promise<void> {
    try {
      const { subTopicId } = req.params;
      const { limit = 20 } = req.query;
      
      const cards = await studyCardService.getCardsForStudy(Number(subTopicId), Number(limit));
      
      res.status(200).json({
        success: true,
        data: cards
      });
    } catch (error) {
      console.error("Error al obtener cartas para estudio:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error interno del servidor" 
      });
    }
  }

  // Obtener todas las cartas (público)
  async getAllCards(req: Request, res: Response): Promise<void> {
    try {
      const { limit, page } = req.query;
      const cards = await studyCardService.getAllCards(
        limit ? Number(limit) : undefined,
        page ? Number(page) : undefined
      );

      res.status(200).json({ success: true, data: cards });
    } catch (error) {
      console.error('Error al obtener todas las cartas:', error);
      res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  }
}

export default new StudyCardController();
