import { Request, Response } from "express";
import studySessionService from "./studySession.service";
import { validationResult } from "express-validator";

export class StudySessionController {

  // Iniciar una nueva sesión de estudio
  async startSession(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ 
          success: false, 
          message: "Errores de validación", 
          errors: errors.array() 
        });
        return;
      }

      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ 
          success: false, 
          message: "Usuario no autenticado" 
        });
        return;
      }

      // Verificar si ya tiene una sesión activa
      const activeSession = await studySessionService.getActiveSession(userId);
      if (activeSession) {
        res.status(409).json({
          success: false,
          message: "Ya tienes una sesión activa",
          data: { activeSessionId: activeSession.id }
        });
        return;
      }

      const { studyCardId, sessionType, sessionGoal } = req.body;

      const session = await studySessionService.startStudySession(userId, {
        studyCardId,
        sessionType,
        sessionGoal
      });

      res.status(201).json({
        success: true,
        message: "Sesión de estudio iniciada",
        data: session
      });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error interno del servidor" 
      });
    }
  }

  // Finalizar una sesión de estudio
  async finishSession(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ 
          success: false, 
          message: "Errores de validación", 
          errors: errors.array() 
        });
        return;
      }

      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ 
          success: false, 
          message: "Usuario no autenticado" 
        });
        return;
      }

      const { sessionId } = req.params;
      const { cardsStudied, notes } = req.body;

      const result = await studySessionService.finishStudySession(Number(sessionId), {
        cardsStudied,
        endTime: new Date(),
        notes
      });

      res.status(200).json({
        success: true,
        message: "Sesión completada exitosamente",
        data: result
      });
    } catch (error) {
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
  async recordCardStudy(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ 
          success: false, 
          message: "Errores de validación", 
          errors: errors.array() 
        });
        return;
      }

      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ 
          success: false, 
          message: "Usuario no autenticado" 
        });
        return;
      }

      const { cardId } = req.params;
      const { sessionId } = req.body;

      const userCard = await studySessionService.recordCardStudy(
        userId, 
        Number(cardId),
        sessionId
      );

      res.status(200).json({
        success: true,
        message: "Estudio de tarjeta registrado",
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

  // Obtener historial de sesiones del usuario
  async getSessionHistory(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ 
          success: false, 
          message: "Usuario no autenticado" 
        });
        return;
      }

      const { 
        sessionType, 
        page = 1, 
        limit = 20, 
        startDate, 
        endDate 
      } = req.query;

      const offset = (Number(page) - 1) * Number(limit);

      const filters = {
        sessionType: sessionType as string,
        limit: Number(limit),
        offset,
        startDate: startDate ? new Date(startDate as string) : undefined,
        endDate: endDate ? new Date(endDate as string) : undefined
      };

      const result = await studySessionService.getUserSessionHistory(userId, filters);

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
    } catch (error) {
      console.error("Error al obtener historial:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error interno del servidor" 
      });
    }
  }

  // Obtener estadísticas de estudio del usuario
  async getStudyStatistics(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ 
          success: false, 
          message: "Usuario no autenticado" 
        });
        return;
      }

      const { timeframe = "month" } = req.query;

      const stats = await studySessionService.getUserStudyStatistics(
        userId, 
        timeframe as "week" | "month" | "year"
      );

      res.status(200).json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error("Error al obtener estadísticas:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error interno del servidor" 
      });
    }
  }

  // Obtener sesión activa del usuario
  async getActiveSession(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ 
          success: false, 
          message: "Usuario no autenticado" 
        });
        return;
      }

      const activeSession = await studySessionService.getActiveSession(userId);

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
    } catch (error) {
      console.error("Error al obtener sesión activa:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error interno del servidor" 
      });
    }
  }

  // Cancelar sesión activa
  async cancelActiveSession(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ 
          success: false, 
          message: "Usuario no autenticado" 
        });
        return;
      }

      const activeSession = await studySessionService.getActiveSession(userId);

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
    } catch (error) {
      console.error("Error al cancelar sesión:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error interno del servidor" 
      });
    }
  }
}

export default new StudySessionController();
