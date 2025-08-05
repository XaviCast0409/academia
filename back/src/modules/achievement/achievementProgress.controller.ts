import { Request, Response } from 'express';
import { 
  updateAchievementProgressFromAction,
  updateProgressFromActivity,
  updateProgressFromLevelUp,
  updateProgressFromStreak,
  updateProgressFromCoins,
  updateProgressFromRanking,
  forceUpdateAllUserAchievements,
  AchievementProgressData
} from './achievementProgress.service';
import { errorHelper } from '../../utils/error';

/**
 * Controlador para manejar el progreso de logros
 */

// Actualizar progreso por actividad completada
export const updateProgressFromActivityController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { activityType, mathTopic, perfectScore } = req.body;

    if (!userId) {
      res.status(400).json({ error: 'userId es requerido' });
      return;
    }

    const unlockedAchievements = await updateProgressFromActivity(Number(userId), {
      type: activityType,
      mathTopic,
      perfectScore
    });

    res.status(200).json({
      success: true,
      data: {
        unlockedAchievements,
        count: unlockedAchievements.length
      },
      message: `${unlockedAchievements.length} logros desbloqueados`
    });
  } catch (error) {
    errorHelper(error, res);
  }
};

// Actualizar progreso por subida de nivel
export const updateProgressFromLevelUpController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { newLevel } = req.body;

    if (!userId || !newLevel) {
      res.status(400).json({ error: 'userId y newLevel son requeridos' });
      return;
    }

    const unlockedAchievements = await updateProgressFromLevelUp(Number(userId), Number(newLevel));

    res.status(200).json({
      success: true,
      data: {
        unlockedAchievements,
        count: unlockedAchievements.length
      },
      message: `${unlockedAchievements.length} logros desbloqueados por subida de nivel`
    });
  } catch (error) {
    errorHelper(error, res);
  }
};

// Actualizar progreso por racha de días
export const updateProgressFromStreakController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { streakDays } = req.body;

    if (!userId || streakDays === undefined) {
      res.status(400).json({ error: 'userId y streakDays son requeridos' });
      return;
    }

    const unlockedAchievements = await updateProgressFromStreak(Number(userId), Number(streakDays));

    res.status(200).json({
      success: true,
      data: {
        unlockedAchievements,
        count: unlockedAchievements.length
      },
      message: `${unlockedAchievements.length} logros desbloqueados por racha`
    });
  } catch (error) {
    errorHelper(error, res);
  }
};

// Actualizar progreso por XaviCoins ganadas
export const updateProgressFromCoinsController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { totalCoins } = req.body;

    if (!userId || totalCoins === undefined) {
      res.status(400).json({ error: 'userId y totalCoins son requeridos' });
      return;
    }

    const unlockedAchievements = await updateProgressFromCoins(Number(userId), Number(totalCoins));

    res.status(200).json({
      success: true,
      data: {
        unlockedAchievements,
        count: unlockedAchievements.length
      },
      message: `${unlockedAchievements.length} logros desbloqueados por XaviCoins`
    });
  } catch (error) {
    errorHelper(error, res);
  }
};

// Actualizar progreso por ranking
export const updateProgressFromRankingController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { rankingPosition } = req.body;

    if (!userId || rankingPosition === undefined) {
      res.status(400).json({ error: 'userId y rankingPosition son requeridos' });
      return;
    }

    const unlockedAchievements = await updateProgressFromRanking(Number(userId), Number(rankingPosition));

    res.status(200).json({
      success: true,
      data: {
        unlockedAchievements,
        count: unlockedAchievements.length
      },
      message: `${unlockedAchievements.length} logros desbloqueados por ranking`
    });
  } catch (error) {
    errorHelper(error, res);
  }
};

// Función principal para actualizar progreso desde cualquier acción
export const updateProgressFromActionController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const progressData: AchievementProgressData = req.body;

    if (!userId) {
      res.status(400).json({ error: 'userId es requerido' });
      return;
    }

    progressData.userId = Number(userId);
    const unlockedAchievements = await updateAchievementProgressFromAction(progressData);

    res.status(200).json({
      success: true,
      data: {
        unlockedAchievements,
        count: unlockedAchievements.length
      },
      message: `${unlockedAchievements.length} logros desbloqueados`
    });
  } catch (error) {
    errorHelper(error, res);
  }
};

// Forzar actualización de todos los logros de un usuario (para debugging)
export const forceUpdateAllUserAchievementsController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ error: 'userId es requerido' });
      return;
    }

    const results = await forceUpdateAllUserAchievements(Number(userId));

    res.status(200).json({
      success: true,
      data: results,
      message: `Actualización forzada completada: ${results.updated} actualizados, ${results.unlocked} desbloqueados`
    });
  } catch (error) {
    errorHelper(error, res);
  }
};

// Obtener progreso detallado de logros de un usuario
export const getUserAchievementProgressController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ error: 'userId es requerido' });
      return;
    }

    const db = require('../../config/database').default;
    
    const userAchievements = await db.UserAchievement.findAll({
      where: { userId: Number(userId) },
      include: [{ 
        model: db.Achievement, 
        as: 'achievement',
        where: { isActive: true }
      }],
      order: [['createdAt', 'DESC']]
    });

    const summary = {
      total: userAchievements.length,
      unlocked: userAchievements.filter((ua: any) => ua.isUnlocked).length,
      claimed: userAchievements.filter((ua: any) => ua.rewardClaimed).length,
      pending: userAchievements.filter((ua: any) => ua.isUnlocked && !ua.rewardClaimed).length,
      inProgress: userAchievements.filter((ua: any) => !ua.isUnlocked).length
    };

    res.status(200).json({
      success: true,
      data: {
        summary,
        achievements: userAchievements
      }
    });
  } catch (error) {
    errorHelper(error, res);
  }
}; 

// Debug endpoint para verificar estado de logros
export const debugUserAchievementsController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ error: 'userId es requerido' });
      return;
    }

    const db = require('../../config/database').default;
    
    // Obtener usuario
    const user = await db.User.findByPk(Number(userId));
    if (!user) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    // Obtener logros del usuario
    const userAchievements = await db.UserAchievement.findAll({
      where: { userId: Number(userId) },
      include: [{ 
        model: db.Achievement, 
        as: 'achievement'
      }],
      order: [['createdAt', 'DESC']]
    });



    // Contar evidencias aprobadas
    const approvedEvidences = await db.Evidence.count({
      where: { 
        studentId: Number(userId),
        status: "approved"
      }
    });

    // Obtener todos los logros disponibles
    const allAchievements = await db.Achievement.findAll({
      where: { isActive: true }
    });

    const debugInfo = {
      user: {
        id: user.id,
        name: user.name,
        level: user.level,
        xavicoints: user.xavicoints,
        completedActivities: user.completedActivities,
        currentStreak: user.currentStreak,
        lastActivityDate: user.lastActivityDate
      },
      statistics: {
        approvedEvidences,
        totalAchievements: allAchievements.length,
        userAchievements: userAchievements.length,
        unlockedAchievements: userAchievements.filter((ua: any) => ua.isUnlocked).length
      },
      userAchievements: userAchievements.map((ua: any) => ({
        id: ua.id,
        userId: ua.userId,
        achievementId: ua.achievementId,
        progress: ua.progress,
        isUnlocked: ua.isUnlocked,
        rewardClaimed: ua.rewardClaimed,
        unlockedAt: ua.unlockedAt,
        claimedAt: ua.claimedAt,
        createdAt: ua.createdAt,
        updatedAt: ua.updatedAt,
        achievement: {
          id: ua.achievement.id,
          title: ua.achievement.title,
          description: ua.achievement.description,
          icon: ua.achievement.icon,
          category: ua.achievement.category,
          requirementType: ua.achievement.requirementType,
          requirementValue: ua.achievement.requirementValue,
          requirementCondition: ua.achievement.requirementCondition,
          mathTopic: ua.achievement.mathTopic,
          rewardType: ua.achievement.rewardType,
          rewardValue: ua.achievement.rewardValue,
          isActive: ua.achievement.isActive,
          createdAt: ua.achievement.createdAt,
          updatedAt: ua.achievement.updatedAt
        }
      })),
      missingAchievements: allAchievements.filter((achievement: any) => 
        !userAchievements.some((ua: any) => ua.achievementId === achievement.id)
      ).map((achievement: any) => ({
        id: achievement.id,
        title: achievement.title,
        description: achievement.description,
        icon: achievement.icon,
        category: achievement.category,
        requirementType: achievement.requirementType,
        requirementValue: achievement.requirementValue,
        requirementCondition: achievement.requirementCondition,
        mathTopic: achievement.mathTopic,
        rewardType: achievement.rewardType,
        rewardValue: achievement.rewardValue,
        isActive: achievement.isActive,
        createdAt: achievement.createdAt,
        updatedAt: achievement.updatedAt
      })),
      streakAchievements: userAchievements
        .filter((ua: any) => ua.achievement.requirementType === 'streak_days')
        .map((ua: any) => ({
          id: ua.id,
          userId: ua.userId,
          achievementId: ua.achievementId,
          progress: ua.progress,
          isUnlocked: ua.isUnlocked,
          rewardClaimed: ua.rewardClaimed,
          unlockedAt: ua.unlockedAt,
          claimedAt: ua.claimedAt,
          createdAt: ua.createdAt,
          updatedAt: ua.updatedAt,
          achievement: {
            id: ua.achievement.id,
            title: ua.achievement.title,
            description: ua.achievement.description,
            icon: ua.achievement.icon,
            category: ua.achievement.category,
            requirementType: ua.achievement.requirementType,
            requirementValue: ua.achievement.requirementValue,
            requirementCondition: ua.achievement.requirementCondition,
            mathTopic: ua.achievement.mathTopic,
            rewardType: ua.achievement.rewardType,
            rewardValue: ua.achievement.rewardValue,
            isActive: ua.achievement.isActive,
            createdAt: ua.achievement.createdAt,
            updatedAt: ua.achievement.updatedAt
          }
        }))
    };

    res.status(200).json({
      success: true,
      data: debugInfo
    });
  } catch (error) {
    errorHelper(error, res);
  }
}; 