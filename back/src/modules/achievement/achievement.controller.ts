import { Request, Response } from "express";
import {
  getAchievementsForUser,
  claimAchievementReward,
  checkAndUpdateAchievements,
  getAchievementProgress,
  getAllAchievements,
  assignAllAchievementsToUser,
  updateAchievementProgress
} from "./achievement.service";
import { errorHelper } from "../../utils/error";
import db from "../../config/database";

export const getAchievementsForUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId;
    const achievements = await getAchievementsForUser(Number(userId));
    res.status(200).json(achievements);
  } catch (error) {
    errorHelper(error, res);
  }
};

export const claimAchievementRewardController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const achievementId = Number(req.params.id);
    const result = await claimAchievementReward(Number(userId), achievementId);
    res.status(200).json(result);
  } catch (error) {
    errorHelper(error, res);
  }
};

export const checkAndUpdateAchievementsController = async (req: Request, res: Response) => {
  try {
    const { userId, activityData } = req.body;
    const newAchievements = await checkAndUpdateAchievements(Number(userId), activityData);
    res.status(200).json(newAchievements);
  } catch (error) {
    errorHelper(error, res);
  }
};

export const getAchievementProgressController = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId;
    const progress = await getAchievementProgress(Number(userId));
    res.status(200).json(progress);
  } catch (error) {
    errorHelper(error, res);
  }
};

export const getAllAchievementsController = async (req: Request, res: Response) => {
  try {
    const achievements = await getAllAchievements();
    res.status(200).json(achievements);
  } catch (error) {
    errorHelper(error, res);
  }
};

// Asignar todos los logros a un usuario
export const assignAllAchievementsController = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    
    const result = await assignAllAchievementsToUser(userId);
    
    res.status(200).json({
      success: true,
      message: `Logros asignados exitosamente al usuario ${userId}`,
      data: result
    });
  } catch (error) {
    console.error('❌ Error en assignAllAchievementsController:', error);
    errorHelper(error, res);
  }
};

// Actualizar progreso de logros después de una acción
export const updateAchievementProgressController = async (req: Request, res: Response) => {
  try {
    const { userId, activityData } = req.body;

    
    const result = await updateAchievementProgress(Number(userId), activityData);
    
    res.status(200).json({
      success: true,
      message: `Progreso de logros actualizado para usuario ${userId}`,
      data: result
    });
  } catch (error) {
    console.error('❌ Error en updateAchievementProgressController:', error);
    errorHelper(error, res);
  }
};

// NUEVO: Endpoint para debug - ver progreso detallado de logros de un usuario
export const debugUserAchievementsController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await db.User.findByPk(parseInt(userId));
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Contar actividades completadas
    const completedActivities = await db.Evidence.count({
      where: { 
        studentId: parseInt(userId),
        status: "approved"
      }
    });

    // Obtener logros de actividades completadas
    const activityAchievements = await db.Achievement.findAll({
      where: { 
        isActive: true,
        requirementType: 'activities_completed'
      }
    });

    // Obtener progreso del usuario para estos logros
    const userAchievements = await db.UserAchievement.findAll({
      where: { userId: parseInt(userId) },
      include: [{
        model: db.Achievement,
        as: 'achievement',
        where: { requirementType: 'activities_completed' }
      }]
    });

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          totalActivitiesCompleted: user.totalActivitiesCompleted,
          completedActivitiesFromDB: completedActivities
        },
        activityAchievements: activityAchievements.map((a: any) => ({
          id: a.id,
          title: a.title,
          requirementValue: a.requirementValue
        })),
        userProgress: userAchievements.map((ua: any) => ({
          achievementId: ua.achievementId,
          achievementTitle: ua.achievement.title,
          currentProgress: ua.currentProgress,
          isUnlocked: ua.isUnlocked,
          requirementValue: ua.achievement.requirementValue
        }))
      }
    });
  } catch (error) {
    console.error('❌ Error en debugUserAchievementsController:', error);
    errorHelper(error, res);
  }
};
