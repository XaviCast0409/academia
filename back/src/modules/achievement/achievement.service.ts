import db from "../../config/database";

export const getAchievementsForUser = async (userId: number): Promise<any> => {
  return await db.UserAchievement.findAll({
    where: { userId },
    include: [{ model: db.Achievement, as: "achievement", where: { isActive: true } }],
    order: [["createdAt", "DESC"]],
  });
};

export const claimAchievementReward = async (userId: number, achievementId: number): Promise<any> => {
  const userAchievement = await db.UserAchievement.findOne({ 
    where: { userId, achievementId },
    include: [{ model: db.Achievement, as: "achievement" }]
  });
  
  if (!userAchievement || !userAchievement.isUnlocked || userAchievement.rewardClaimed) {
    throw new Error("Logro no disponible para reclamar");
  }

  // Otorgar recompensa seg�n el tipo
  const achievement = userAchievement.achievement;
  if (achievement.rewardType === "coins") {
    const user = await db.User.findByPk(userId);
    if (user) {
      user.xavicoints = (user.xavicoints || 0) + Number(achievement.rewardValue);
      await user.save();
    }
  }

  // Marcar como reclamado
  userAchievement.rewardClaimed = true;
  userAchievement.claimedAt = new Date();
  await userAchievement.save();

  return userAchievement;
};

export const checkAndUpdateAchievements = async (userId: number, activityData: any): Promise<any[]> => {
  const user = await db.User.findByPk(userId);
  if (!user) throw new Error("Usuario no encontrado");

  const newAchievements = [];
  const achievements = await db.Achievement.findAll({ where: { isActive: true } });

  for (const achievement of achievements) {
    const userAchievement = await db.UserAchievement.findOne({
      where: { userId, achievementId: achievement.id }
    });

    if (!userAchievement || !userAchievement.isUnlocked) {
      const shouldUnlock = await checkAchievementCondition(user, achievement, activityData);
      
      if (shouldUnlock) {
        if (!userAchievement) {
          await db.UserAchievement.create({
            userId,
            achievementId: achievement.id,
            progress: achievement.requirementValue,
            isUnlocked: true,
            unlockedAt: new Date(),
            rewardClaimed: false,
          });
        } else {
          userAchievement.isUnlocked = true;
          userAchievement.unlockedAt = new Date();
          await userAchievement.save();
        }
        
        newAchievements.push(achievement);
      }
    }
  }

  return newAchievements;
};

const checkAchievementCondition = async (user: any, achievement: any, activityData: any): Promise<boolean> => {
  switch (achievement.requirementType) {
    case "activities_completed":
      return user.totalActivitiesCompleted >= achievement.requirementValue;
    
    case "level_reached":
      return user.level >= achievement.requirementValue;
    
    case "streak_days":
      return user.currentStreak >= achievement.requirementValue;
    
    case "coins_earned":
      return user.xavicoints >= achievement.requirementValue;
    
    case "perfect_scores":
      return user.perfectScores >= achievement.requirementValue;
    
    case "math_topic":
      if (achievement.mathTopic && activityData.mathTopic === achievement.mathTopic) {
        // Contar actividades del tema espec�fico
        const topicActivities = await db.Evidence.count({
          where: { 
            studentId: user.id,
            status: "approved"
          },
          include: [{
            model: db.Activity,
            as: "activity",
            where: { mathTopic: achievement.mathTopic }
          }]
        });
        return topicActivities >= achievement.requirementValue;
      }
      return false;
    
    default:
      return false;
  }
};

export const getAchievementProgress = async (userId: number): Promise<any> => {
  return await db.UserAchievement.findAll({
    where: { userId },
    include: [{ model: db.Achievement, as: "achievement" }],
    order: [["createdAt", "DESC"]],
  });
};

export const getAllAchievements = async (): Promise<any> => {
  return await db.Achievement.findAll({
    where: { isActive: true },
    order: [["category", "ASC"], ["requirementValue", "ASC"]],
  });
};

/**
 * Calcular el progreso actual de un usuario para un logro específico
 */
const calculateAchievementProgress = async (user: any, achievement: any): Promise<number> => {
  switch (achievement.requirementType) {
    case "activities_completed":
      // Contar actividades completadas desde la base de datos para mayor precisión
      const completedActivities = await db.Evidence.count({
        where: { 
          studentId: user.id,
          status: "approved"
        }
      });
  
      return completedActivities;
    
    case "level_reached":
      return user.level || 1;
    
    case "streak_days":
      return user.currentStreak || 0;
    
    case "coins_earned":
      return user.xavicoints || 0;
    
    case "perfect_scores":
      return user.perfectScores || 0;
    
    case "math_topic":
      if (achievement.mathTopic) {
        const topicActivities = await db.Evidence.count({
          where: { 
            studentId: user.id,
            status: "approved"
          },
          include: [{
            model: db.Activity,
            as: "activity",
            where: { mathTopic: achievement.mathTopic }
          }]
        });
        return topicActivities;
      }
      return 0;
    
    default:
      return 0;
  }
};

/**
 * Asignar todos los logros activos a un usuario si no los tiene
 * Esto permite que el usuario vea su progreso desde el inicio
 */
export const assignAllAchievementsToUser = async (userId: number): Promise<any> => {
  const user = await db.User.findByPk(userId);
  if (!user) throw new Error("Usuario no encontrado");

  const achievements = await db.Achievement.findAll({ where: { isActive: true } });
  const assignedCount = { created: 0, updated: 0 };

  

  for (const achievement of achievements) {
    const userAchievement = await db.UserAchievement.findOne({
      where: { userId, achievementId: achievement.id }
    });

    if (!userAchievement) {
      // Calcular progreso actual del usuario para este logro
      const currentProgress = await calculateAchievementProgress(user, achievement);
      
      // Verificar si ya debería estar desbloqueado
      const isUnlocked = currentProgress >= achievement.requirementValue;
      
      await db.UserAchievement.create({
        userId,
        achievementId: achievement.id,
        progress: currentProgress,
        isUnlocked: isUnlocked,
        unlockedAt: isUnlocked ? new Date() : null,
        rewardClaimed: false,
      });
      
      assignedCount.created++;

    } else {
      // Actualizar progreso si ya existe
      const currentProgress = await calculateAchievementProgress(user, achievement);
      const wasUnlocked = userAchievement.isUnlocked;
      const shouldBeUnlocked = currentProgress >= achievement.requirementValue;
      
      userAchievement.progress = currentProgress;
      
      if (!wasUnlocked && shouldBeUnlocked) {
        userAchievement.isUnlocked = true;
        userAchievement.unlockedAt = new Date();
      }
      
      await userAchievement.save();
      assignedCount.updated++;
    }
  }

  
  return assignedCount;
};

/**
 * Actualizar progreso de logros después de completar una actividad
 * Esta función debería llamarse cada vez que el usuario complete una acción
 */
export const updateAchievementProgress = async (userId: number, activityData?: any): Promise<any> => {
  
  
  const user = await db.User.findByPk(userId);
  if (!user) throw new Error("Usuario no encontrado");

  const achievements = await db.Achievement.findAll({ where: { isActive: true } });
  
  
  const updatedAchievements = [];

  for (const achievement of achievements) {
    let userAchievement = await db.UserAchievement.findOne({
      where: { userId, achievementId: achievement.id }
    });

    // Si no existe, asignar el logro primero
    if (!userAchievement) {
      const currentProgress = await calculateAchievementProgress(user, achievement);
      const isUnlocked = currentProgress >= achievement.requirementValue;
      
      userAchievement = await db.UserAchievement.create({
        userId,
        achievementId: achievement.id,
        progress: currentProgress,
        isUnlocked: isUnlocked,
        unlockedAt: isUnlocked ? new Date() : null,
        rewardClaimed: false,
      });
      
      
    } else if (!userAchievement.isUnlocked) {
      // Actualizar progreso si no está desbloqueado
      const currentProgress = await calculateAchievementProgress(user, achievement);
      const oldProgress = userAchievement.progress;
      
      userAchievement.progress = currentProgress;
      
      // Log específico para logros de actividades completadas
      if (achievement.requirementType === 'activities_completed') {

      }
      
      // Verificar si se desbloqueó
      if (currentProgress >= achievement.requirementValue) {
        userAchievement.isUnlocked = true;
        userAchievement.unlockedAt = new Date();
        
      } else if (currentProgress > oldProgress) {
        
      }
      
      await userAchievement.save();
    }
    
    updatedAchievements.push(userAchievement);
  }

  return updatedAchievements;
};


