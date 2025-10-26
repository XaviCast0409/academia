import { Request, Response } from "express";
import studySessionService from "./studySession.service";

export class StudySessionController {

  // Iniciar una nueva sesión de estudio
  async startStudySession(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ 
          success: false, 
          message: "Usuario no autenticado" 
        });
        return;
      }

      const sessionData = req.body;
      const session = await studySessionService.startStudySession(userId, sessionData);
      
      res.status(201).json({
        success: true,
        message: "Sesión de estudio iniciada",
        data: session
      });
    } catch (error) {
      console.error("Error al iniciar sesión de estudio:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error interno del servidor" 
      });
    }
  }

  // Finalizar una sesión de estudio
  async endStudySession(req: Request, res: Response): Promise<void> {
    try {
      const { sessionId } = req.params;
      const userId = (req as any).user?.id;
      
      if (!userId) {
        res.status(401).json({ 
          success: false, 
          message: "Usuario no autenticado" 
        });
        return;
      }

      const sessionData = req.body;
      const result: any = await studySessionService.endStudySession(Number(sessionId), userId, sessionData);

      // Si el servicio devuelve rewards === null es porque ya estaba completada
      if (result && result.rewards === null) {
        res.status(200).json({
          success: true,
          message: 'Sesión ya finalizada',
          data: result.session
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Sesión de estudio finalizada",
        data: result.session,
        rewards: result.rewards
      });
    } catch (error) {
      console.error("Error al finalizar sesión de estudio:", error);
      if (error instanceof Error && error.message === 'Sesión no encontrada') {
        res.status(404).json({ success: false, message: error.message });
        return;
      }

      // Duracion mínima no alcanzada
      if (error && (error as any).message === 'DuracionMinimaNoAlcanzada') {
        const details = (error as any).details || {};
        res.status(400).json({ success: false, message: 'No alcanzaste el tiempo mínimo de estudio', details });
        return;
      }

      res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
  }

  // Obtener sesiones del usuario
  async getUserSessions(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ 
          success: false, 
          message: "Usuario no autenticado" 
        });
        return;
      }

      const { limit = 20 } = req.query;
      const sessions = await studySessionService.getUserSessions(userId, Number(limit));
      
      res.status(200).json({
        success: true,
        data: sessions
      });
    } catch (error) {
      console.error("Error al obtener sesiones:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error interno del servidor" 
      });
    }
  }

  // Obtener una sesión por ID
  async getSessionById(req: Request, res: Response): Promise<void> {
    try {
      const { sessionId } = req.params;
      const userId = (req as any).user?.id;
      
      if (!userId) {
        res.status(401).json({ 
          success: false, 
          message: "Usuario no autenticado" 
        });
        return;
      }

      const session = await studySessionService.getSessionById(Number(sessionId), userId);
      
      if (!session) {
        res.status(404).json({ 
          success: false, 
          message: "Sesión no encontrada" 
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: session
      });
    } catch (error) {
      console.error("Error al obtener sesión:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error interno del servidor" 
      });
    }
  }

  // Obtener estadísticas de estudio del usuario
  async getUserStudyStats(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ 
          success: false, 
          message: "Usuario no autenticado" 
        });
        return;
      }

      const stats = await studySessionService.getUserStudyStats(userId);
      
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

      const session = await studySessionService.getActiveSession(userId);
      
      res.status(200).json({
        success: true,
        data: session
      });
    } catch (error) {
      console.error("Error al obtener sesión activa:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error interno del servidor" 
      });
    }
  }

  // Cancelar sesión activa del usuario
  async cancelActiveSession(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      // Si no hay usuario, devolver 200 para no romper flujo anónimo
      if (!userId) {
        res.status(200).json({ success: true, message: 'No active session for anonymous user' });
        return;
      }

      const cancelled = await studySessionService.cancelActiveSession(userId);

      res.status(200).json({ success: true, message: 'Active session cancelled', data: cancelled });
    } catch (error) {
      console.error('Error cancelling active session:', error);
      res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  }

  // Añadir recompensas directamente a un usuario (monedas + experiencia)
  async addRewardsToUser(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const { xavicoins = 0, experience = 0 } = req.body || {};

      // Validación mínima
      const uid = Number(userId);
      if (!uid || (Number(xavicoins) === 0 && Number(experience) === 0)) {
        res.status(400).json({ success: false, message: 'Parámetros inválidos' });
        return;
      }

      const result = await studySessionService.addRewardsToUser(uid, Number(xavicoins), Number(experience));

      res.status(200).json({ success: true, message: 'Recompensas aplicadas', data: result });
    } catch (error) {
      console.error('Error adding rewards to user:', error);
      if (process.env.NODE_ENV !== 'production') {
        res.status(500).json({ success: false, message: 'Error interno del servidor', error: (error as any)?.message, stack: (error as any)?.stack });
      } else {
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
      }
    }
  }
}

export default new StudySessionController();
