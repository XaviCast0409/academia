import { StudySession, StudySessionInput } from "../../models/StudySession";
import { UserStudyCard } from "../../models/UserStudyCard";
import { StudyCard } from "../../models/StudyCard";
import { User } from "../../models/User";
import { Op } from "sequelize";
import db from "../../config/database";

export class StudySessionService {

  // Iniciar una nueva sesión de estudio
  async startStudySession(userId: number, sessionData: {
    studyCardId?: number;
    sessionType?: "individual" | "review" | "quiz" | "general";
    sessionGoal?: number; // Meta en minutos
  }) {
    try {
      const session = await StudySession.create({
        userId,
        studyCardId: sessionData.studyCardId,
        sessionType: sessionData.sessionType || "general",
        startTime: new Date(),
        duration: 0,
        cardsStudied: 0,
        xavicoinsEarned: 0,
        isCompleted: false,
        sessionGoal: sessionData.sessionGoal,
      });

      return session;
    } catch (error) {
      throw new Error("Error al iniciar sesión de estudio");
    }
  }

  // Finalizar una sesión de estudio y calcular recompensas
  async finishStudySession(sessionId: number, sessionData: {
    cardsStudied: number;
    endTime: Date;
    notes?: string;
  }) {
    try {
      const session = await StudySession.findByPk(sessionId);
      
      if (!session) {
        throw new Error("Sesión no encontrada");
      }

      if (session.isCompleted) {
        throw new Error("La sesión ya está completada");
      }

      // Calcular duración en minutos
      const startTime = new Date(session.startTime);
      const endTime = sessionData.endTime;
      const durationMs = endTime.getTime() - startTime.getTime();
      const durationMinutes = Math.floor(durationMs / (1000 * 60));

      // Calcular XaviCoins ganados
      let xavicoinsEarned = 0;
      
      // Recompensa base por tiempo de estudio
      if (durationMinutes >= 10) {
        xavicoinsEarned += 10; // 10 XaviCoins por 10+ minutos
      }
      if (durationMinutes >= 15) {
        xavicoinsEarned += 5; // +5 XaviCoins por 15+ minutos
      }
      if (durationMinutes >= 20) {
        xavicoinsEarned += 10; // +10 XaviCoins por 20+ minutos
      }
      if (durationMinutes >= 30) {
        xavicoinsEarned += 15; // +15 XaviCoins por 30+ minutos
      }

      // Recompensa adicional por tarjetas estudiadas
      xavicoinsEarned += sessionData.cardsStudied * 2; // 2 XaviCoins por tarjeta

      // Bonus por cumplir meta
      if (session.sessionGoal && durationMinutes >= session.sessionGoal) {
        xavicoinsEarned += Math.floor(session.sessionGoal / 5); // Bonus por cumplir meta
      }

      // Actualizar la sesión
      await session.update({
        endTime: sessionData.endTime,
        duration: durationMinutes,
        cardsStudied: sessionData.cardsStudied,
        xavicoinsEarned,
        isCompleted: true,
        notes: sessionData.notes,
      });

      // Actualizar XaviCoins del usuario
      await this.updateUserXavicoins(session.userId, xavicoinsEarned);

      return {
        session,
        rewardsEarned: {
          xavicoins: xavicoinsEarned,
          timeBonus: durationMinutes >= (session.sessionGoal || 10),
          cardsBonus: sessionData.cardsStudied * 2
        }
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Error al finalizar sesión de estudio");
    }
  }

  // Registrar que un usuario estudió una tarjeta específica
  async recordCardStudy(userId: number, studyCardId: number, sessionId?: number) {
    try {
      // Buscar o crear el registro de usuario-tarjeta
      const [userCard, created] = await UserStudyCard.findOrCreate({
        where: { userId, studyCardId },
        defaults: {
          userId,
          studyCardId,
          isFavorite: false,
          timesStudied: 1,
          lastStudied: new Date(),
          masteryLevel: "aprendiendo"
        }
      });

      if (!created) {
        // Actualizar el registro existente
        await userCard.update({
          timesStudied: userCard.timesStudied + 1,
          lastStudied: new Date(),
          masteryLevel: this.calculateMasteryLevel(userCard.timesStudied + 1)
        });
      }

      // Si hay una sesión activa, crear el registro de la tarjeta específica
      if (sessionId) {
        await StudySession.create({
          userId,
          studyCardId,
          sessionType: "individual",
          startTime: new Date(),
          endTime: new Date(),
          duration: 0, // Se puede actualizar después
          cardsStudied: 1,
          xavicoinsEarned: 0,
          isCompleted: true,
        });
      }

      return userCard;
    } catch (error) {
      throw new Error("Error al registrar estudio de tarjeta");
    }
  }

  // Obtener historial de sesiones de un usuario
  async getUserSessionHistory(userId: number, filters?: {
    sessionType?: string;
    limit?: number;
    offset?: number;
    startDate?: Date;
    endDate?: Date;
  }) {
    try {
      const whereClause: any = { 
        userId,
        isCompleted: true 
      };

      if (filters?.sessionType) {
        whereClause.sessionType = filters.sessionType;
      }

      if (filters?.startDate || filters?.endDate) {
        whereClause.startTime = {};
        if (filters.startDate) {
          whereClause.startTime[Op.gte] = filters.startDate;
        }
        if (filters.endDate) {
          whereClause.startTime[Op.lte] = filters.endDate;
        }
      }

      return await StudySession.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: StudyCard,
            as: "studyCard",
            attributes: ["id", "title", "category", "difficulty"]
          }
        ],
        limit: filters?.limit || 20,
        offset: filters?.offset || 0,
        order: [["startTime", "DESC"]],
      });
    } catch (error) {
      throw new Error("Error al obtener historial de sesiones");
    }
  }

  // Obtener estadísticas de estudio del usuario
  async getUserStudyStatistics(userId: number, timeframe?: "week" | "month" | "year") {
    try {
      let startDate: Date;
      const endDate = new Date();

      switch (timeframe) {
        case "week":
          startDate = new Date();
          startDate.setDate(startDate.getDate() - 7);
          break;
        case "month":
          startDate = new Date();
          startDate.setMonth(startDate.getMonth() - 1);
          break;
        case "year":
          startDate = new Date();
          startDate.setFullYear(startDate.getFullYear() - 1);
          break;
        default:
          startDate = new Date();
          startDate.setMonth(startDate.getMonth() - 1);
      }

      const sessions = await StudySession.findAll({
        where: {
          userId,
          isCompleted: true,
          startTime: {
            [Op.gte]: startDate,
            [Op.lte]: endDate
          }
        }
      });

      const totalSessions = sessions.length;
      const totalStudyTime = sessions.reduce((sum, session) => sum + session.duration, 0);
      const totalCardsStudied = sessions.reduce((sum, session) => sum + session.cardsStudied, 0);
      const totalXavicoinsEarned = sessions.reduce((sum, session) => sum + session.xavicoinsEarned, 0);
      const averageSessionDuration = totalSessions > 0 ? totalStudyTime / totalSessions : 0;

      // Calcular racha de días consecutivos
      const streak = await this.calculateStudyStreak(userId);

      return {
        timeframe,
        totalSessions,
        totalStudyTime, // en minutos
        totalCardsStudied,
        totalXavicoinsEarned,
        averageSessionDuration,
        currentStreak: streak,
        dailyAverage: totalStudyTime / (timeframe === "week" ? 7 : timeframe === "month" ? 30 : 365)
      };
    } catch (error) {
      throw new Error("Error al obtener estadísticas de estudio");
    }
  }

  // Obtener sesión activa del usuario
  async getActiveSession(userId: number) {
    try {
      return await StudySession.findOne({
        where: {
          userId,
          isCompleted: false
        },
        order: [["startTime", "DESC"]]
      });
    } catch (error) {
      throw new Error("Error al obtener sesión activa");
    }
  }

  // Funciones auxiliares privadas
  private calculateMasteryLevel(timesStudied: number): "nuevo" | "aprendiendo" | "revisando" | "dominado" {
    if (timesStudied === 0) return "nuevo";
    if (timesStudied <= 2) return "aprendiendo";
    if (timesStudied <= 5) return "revisando";
    return "dominado";
  }

  private async updateUserXavicoins(userId: number, xavicoinsToAdd: number) {
    try {
      const user = await User.findByPk(userId);
      if (user) {
        await user.update({
          xavicoints: (user.xavicoints || 0) + xavicoinsToAdd
        });
      }
    } catch (error) {
      console.error("Error al actualizar XaviCoins del usuario:", error);
    }
  }

  private async calculateStudyStreak(userId: number): Promise<number> {
    try {
      const sessions = await StudySession.findAll({
        where: {
          userId,
          isCompleted: true,
          duration: { [Op.gte]: 10 } // Solo sesiones de al menos 10 minutos
        },
        attributes: ["startTime"],
        order: [["startTime", "DESC"]]
      });

      if (sessions.length === 0) return 0;

      let streak = 0;
      let currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Inicio del día actual

      for (let i = 0; i < sessions.length; i++) {
        const sessionDate = new Date(sessions[i].startTime);
        sessionDate.setHours(0, 0, 0, 0);

        const diffDays = Math.floor((currentDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === streak) {
          streak++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else if (diffDays > streak) {
          break;
        }
      }

      return streak;
    } catch (error) {
      console.error("Error al calcular racha de estudio:", error);
      return 0;
    }
  }
}

export default new StudySessionService();
