import { StudySession, StudySessionInput } from "../../models/StudySession";
import { User } from "../../models/User";
import { Course } from "../../models/Course";
import { SubTopic } from "../../models/SubTopic";
import { StudyCard } from "../../models/StudyCard";
import { UserStudyCard } from "../../models/UserStudyCard";
import { Op } from "sequelize";

export class StudySessionService {
  
  // Iniciar una nueva sesión de estudio
  async startStudySession(userId: number, sessionData: {
    courseId?: number;
    subTopicId?: number;
    sessionType: "course" | "subtopic" | "favorites" | "mixed";
    targetDuration: number; // en minutos
    notes?: string;
  }) {
    const session = await StudySession.create({
      userId,
      courseId: sessionData.courseId,
      subTopicId: sessionData.subTopicId,
      sessionType: sessionData.sessionType,
      startTime: new Date(),
      targetDuration: sessionData.targetDuration,
      notes: sessionData.notes,
      isCompleted: false,
      duration: 0,
      cardsStudied: 0,
      xavicoinsEarned: 0,
      experienceEarned: 0
    });

    return session;
  }

  // Finalizar una sesión de estudio
  async endStudySession(sessionId: number, userId: number, sessionData: {
    cardsStudied: number;
    notes?: string;
    rewardsOverride?: {
  cardsCoinsRounded?: number;
  timeCoins?: number;
  // si el cliente quiere forzar el total exacto mostrado en UI
  totalXavicoins?: number;
  // override opcional de experience
  experience?: number;
    }
  }) {
    // Buscar la sesión sin filtrar por isCompleted para manejar idempotencia
    const session = await StudySession.findOne({ where: { id: sessionId, userId } });

    if (!session) {
      throw new Error('Sesión no encontrada');
    }

    // Si la sesión ya está completada, devolverla (idempotencia) con rewards null
    if (session.isCompleted) {
      return { session, rewards: null };
    }

  const endTime = new Date();
  // duración en minutos (usar ceil para no penalizar por fracciones de minuto)
  const duration = Math.ceil((endTime.getTime() - session.startTime.getTime()) / (1000 * 60));

    // Verificar que se haya alcanzado la duración objetivo
    const target = session.targetDuration || 0;
    if (duration < target) {
      const remaining = target - duration;
      const err: any = new Error('DuracionMinimaNoAlcanzada');
      err.details = { remainingMinutes: remaining, duration, target };
      throw err;
    }

    // Calcular recompensas: si el cliente envía un override, use candidate; si no, usar cálculo interno
    let xavicoins = 0;
    let experience = 0;

    // Server-side safety caps (ajustables)
    const MAX_PER_CARD = 1; // máximo razonable por carta
    const MAX_PER_MINUTE = 2; // máximo razonable por minuto
    const MAX_SESSION_CAP = 500; // tope absoluto por sesión

    // Recompilación del cálculo del servidor (incluye bonuses)
    const serverRewards = this.calculateRewards(duration, sessionData.cardsStudied);
    const serverCalculated = serverRewards.xavicoins;

    // Cap simplificado basado en actividad (para evitar abuso)
    const serverCap = Math.ceil((sessionData.cardsStudied || 0) * MAX_PER_CARD + duration * MAX_PER_MINUTE);
    const appliedMax = Math.min(MAX_SESSION_CAP, Math.max(serverCalculated, serverCap));

    if (sessionData.rewardsOverride) {
      const ro = sessionData.rewardsOverride;
      // candidate: preferir totalXavicoins cuando el cliente lo envía
      let candidateTotal = typeof ro.totalXavicoins === 'number' ? Number(ro.totalXavicoins) : null;

      if (candidateTotal === null) {
        // fallback: composición cards + time (time prefer server if client missing)
        const cardsCoins = Math.max(0, Number(ro.cardsCoinsRounded || 0));
        const timeCoinsClient = (typeof ro.timeCoins === 'number') ? Number(ro.timeCoins) : null;
        const timeCoinsServer = Math.max(0, Number(duration || 0));
        const timeCoins = timeCoinsClient !== null ? timeCoinsClient : timeCoinsServer;
        candidateTotal = Math.ceil(cardsCoins + timeCoins);
      }

      // aplicar cap: nunca aplicar más que appliedMax
      const capped = Math.max(0, Math.min(candidateTotal || 0, appliedMax));
      if ((candidateTotal || 0) > appliedMax) {
        console.warn(`Rewards override too high for session ${sessionId}, user ${userId}: candidate=${candidateTotal}, capped=${capped}, appliedMax=${appliedMax}, serverCalculated=${serverCalculated}`);
      }
      xavicoins = capped;

      // experiencia: allow override or compute server-side
      if (typeof ro.experience === 'number') {
        experience = Number(ro.experience);
      } else {
        experience = serverRewards.experience;
      }
    } else {
      // No override: use authoritative server calculation
      xavicoins = serverCalculated;
      experience = serverRewards.experience;
    }

    // Actualizar la sesión
    await session.update({
      endTime,
      duration,
      cardsStudied: sessionData.cardsStudied,
      xavicoinsEarned: xavicoins,
      experienceEarned: experience,
      isCompleted: true,
      notes: sessionData.notes
    });

  // Actualizar el usuario con las recompensas y obtener resumen (usa método atómico)
  const rewardResult = await this.addRewardsToUser(userId, xavicoins, experience);

    return { session, rewards: rewardResult };
  }

  // Obtener sesiones de un usuario
  async getUserSessions(userId: number, limit: number = 20) {
    return await StudySession.findAll({
      where: { userId },
      include: [
        {
          model: Course,
          as: 'course',
          attributes: ['id', 'name']
        },
        {
          model: SubTopic,
          as: 'subTopic',
          attributes: ['id', 'name']
        }
      ],
      order: [['startTime', 'DESC']],
      limit
    });
  }

  // Obtener una sesión por ID
  async getSessionById(sessionId: number, userId: number) {
    return await StudySession.findOne({
      where: { id: sessionId, userId },
      include: [
        {
          model: Course,
          as: 'course',
          attributes: ['id', 'name']
        },
        {
          model: SubTopic,
          as: 'subTopic',
          attributes: ['id', 'name']
        }
      ]
    });
  }

  // Obtener estadísticas de estudio del usuario
  async getUserStudyStats(userId: number) {
    const sessions = await StudySession.findAll({
      where: { 
        userId,
        isCompleted: true 
      },
      attributes: [
        'duration',
        'cardsStudied',
        'xavicoinsEarned',
        'experienceEarned',
        'sessionType',
        'startTime'
      ]
    });

    const totalSessions = sessions.length;
    const totalDuration = sessions.reduce((sum, session) => sum + session.duration, 0);
    const totalCardsStudied = sessions.reduce((sum, session) => sum + session.cardsStudied, 0);
    const totalXavicoins = sessions.reduce((sum, session) => sum + session.xavicoinsEarned, 0);
    const totalExperience = sessions.reduce((sum, session) => sum + session.experienceEarned, 0);

    // Calcular promedio de duración por sesión
    const avgDuration = totalSessions > 0 ? Math.round(totalDuration / totalSessions) : 0;

    // Obtener sesiones de los últimos 7 días
    const lastWeekSessions = sessions.filter(session => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return session.startTime >= weekAgo;
    });

    const weeklyStats = {
      sessions: lastWeekSessions.length,
      duration: lastWeekSessions.reduce((sum, session) => sum + session.duration, 0),
      cardsStudied: lastWeekSessions.reduce((sum, session) => sum + session.cardsStudied, 0),
      xavicoinsEarned: lastWeekSessions.reduce((sum, session) => sum + session.xavicoinsEarned, 0),
      experienceEarned: lastWeekSessions.reduce((sum, session) => sum + session.experienceEarned, 0)
    };

    return {
      total: {
        sessions: totalSessions,
        duration: totalDuration,
        cardsStudied: totalCardsStudied,
        xavicoinsEarned: totalXavicoins,
        experienceEarned: totalExperience,
        avgDuration
      },
      weekly: weeklyStats
    };
  }

  // Obtener sesión activa del usuario (si existe)
  async getActiveSession(userId: number) {
    return await StudySession.findOne({
      where: { 
        userId,
        isCompleted: false 
      },
      include: [
        {
          model: Course,
          as: 'course',
          attributes: ['id', 'name']
        },
        {
          model: SubTopic,
          as: 'subTopic',
          attributes: ['id', 'name']
        }
      ]
    });
  }

  // Cancelar la sesión activa del usuario (marcar como completada sin recompensas)
  async cancelActiveSession(userId: number) {
    const session = await StudySession.findOne({ where: { userId, isCompleted: false } });
    if (!session) return null;

    const endTime = new Date();
    const duration = Math.round((endTime.getTime() - session.startTime.getTime()) / (1000 * 60));

    await session.update({
      endTime,
      duration,
      isCompleted: true,
      notes: (session.notes || '') + ' (cancelled)'
    });

    return session;
  }

  // Calcular recompensas basadas en duración y cartas estudiadas
  private calculateRewards(duration: number, cardsStudied: number) {
    // Base de recompensas
    let xavicoins = 0;
    let experience = 0;

    // Recompensas por duración (mínimo 5 minutos para recibir recompensas)
    if (duration >= 5) {
      xavicoins += Math.floor(duration / 5) * 2; // 2 xavicoins por cada 5 minutos
      experience += Math.floor(duration / 5) * 5; // 5 exp por cada 5 minutos
    }

    // Recompensas por cartas estudiadas
    xavicoins += cardsStudied * 1; // 1 xavicoin por carta
    experience += cardsStudied * 2; // 2 exp por carta

    // Bonus por sesiones largas
    if (duration >= 30) {
      xavicoins += 10; // Bonus de 10 xavicoins
      experience += 25; // Bonus de 25 exp
    }

    if (duration >= 60) {
      xavicoins += 20; // Bonus adicional de 20 xavicoins
      experience += 50; // Bonus adicional de 50 exp
    }

    return {
      xavicoins: Math.max(0, xavicoins),
      experience: Math.max(0, experience)
    };
  }

  // Actualizar recompensas del usuario
  // Actualizar recompensas del usuario (legacy, usa transacción interna)
  private async updateUserRewards(userId: number, xavicoins: number, experience: number) {
    return this.addRewardsToUser(userId, xavicoins, experience);
  }

  // Método público/atómico para sumar xavicoins y experiencia a un usuario
  // Realiza la operación en una transacción para evitar condiciones de carrera
  public async addRewardsToUser(userId: number, xavicoins: number, experience: number) {
    // Usar transacción de Sequelize
    const sequelize = (User as any).sequelize;
    if (!sequelize) {
      // fallback simple si no hay instancia de sequelize disponible
      const user = await User.findByPk(userId);
      if (!user) throw new Error('Usuario no encontrado');
      const newXavicoins = (user.xavicoints || 0) + xavicoins;
      const newExperience = (user.experience || 0) + experience;
      const newLevel = this.calculateLevel(newExperience);
      await user.update({ xavicoints: newXavicoins, experience: newExperience, level: newLevel });
      return { newXavicoins, newExperience, newLevel, levelUp: newLevel > (user.level || 1) };
    }

    try {
      return await sequelize.transaction(async (tx: any) => {
        // compat: some sequelize versions expect lock: 'UPDATE' or Transaction.LOCK.UPDATE
        const lockOpt: any = tx && tx.LOCK && tx.LOCK.UPDATE ? tx.LOCK.UPDATE : 'UPDATE';
        const user = await User.findByPk(userId, { transaction: tx, lock: lockOpt });
        if (!user) throw new Error('Usuario no encontrado');

        const oldXavicoins = Number(user.xavicoints || 0);
        const oldExperience = Number(user.experience || 0);

        const newXavicoins = oldXavicoins + Number(xavicoins || 0);
        const newExperience = oldExperience + Number(experience || 0);

        const newLevel = this.calculateLevel(newExperience);

        await user.update({ xavicoints: newXavicoins, experience: newExperience, level: newLevel }, { transaction: tx });

        return {
          newXavicoins,
          newExperience,
          newLevel,
          levelUp: newLevel > (user.level || 1)
        };
      });
    } catch (err: any) {
      console.error('Error in addRewardsToUser transaction:', err);
      throw err;
    }
  }

  // Calcular nivel basado en experiencia
  private calculateLevel(experience: number): number {
    // Fórmula: nivel = 1 + sqrt(experiencia / 100)
    return Math.max(1, Math.floor(1 + Math.sqrt(experience / 100)));
  }
}

export default new StudySessionService();
