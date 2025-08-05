import db from "../../config/database";

/**
 * Servicio para manejar el progreso de logros
 * Este servicio se encarga de actualizar automáticamente el progreso
 * cuando el usuario realiza acciones que pueden desbloquear logros
 */

export interface AchievementProgressData {
  userId: number;
  activityType?: string;
  mathTopic?: string;
  xavicoinsEarned?: number;
  levelReached?: number;
  streakDays?: number;
  perfectScore?: boolean;
  rankingPosition?: number;
}

/**
 * Actualizar progreso de logros basado en actividades completadas
 */
export const updateProgressFromActivity = async (userId: number, activityData: any): Promise<any[]> => {

  
  const user = await db.User.findByPk(userId);
  if (!user) throw new Error("Usuario no encontrado");

  const achievements = await db.Achievement.findAll({ 
    where: { 
      isActive: true,
      requirementType: ['activities_completed', 'math_topic', 'perfect_scores']
    } 
  });

  const unlockedAchievements = [];

  for (const achievement of achievements) {
    const userAchievement = await getUserAchievementOrCreate(userId, achievement.id);
    
    if (!userAchievement.isUnlocked) {
      const newProgress = await calculateProgressForAchievement(user, achievement, activityData);
      const wasUnlocked = await updateAchievementProgress(userAchievement, newProgress, achievement);
      
      if (wasUnlocked) {
        unlockedAchievements.push(achievement);
      }
    }
  }

  return unlockedAchievements;
};

/**
 * Actualizar progreso de logros basado en nivel alcanzado
 */
export const updateProgressFromLevelUp = async (userId: number, newLevel: number): Promise<any[]> => {

  
  const user = await db.User.findByPk(userId);
  if (!user) throw new Error("Usuario no encontrado");

  const achievements = await db.Achievement.findAll({ 
    where: { 
      isActive: true,
      requirementType: 'level_reached'
    } 
  });

  const unlockedAchievements = [];

  for (const achievement of achievements) {
    const userAchievement = await getUserAchievementOrCreate(userId, achievement.id);
    
    if (!userAchievement.isUnlocked) {
      const newProgress = newLevel;
      const wasUnlocked = await updateAchievementProgress(userAchievement, newProgress, achievement);
      
      if (wasUnlocked) {
        unlockedAchievements.push(achievement);
      }
    }
  }

  return unlockedAchievements;
};

/**
 * Actualizar progreso de logros basado en racha de días
 */
export const updateProgressFromStreak = async (userId: number, streakDays: number): Promise<any[]> => {

  
  const user = await db.User.findByPk(userId);
  if (!user) throw new Error("Usuario no encontrado");

  const achievements = await db.Achievement.findAll({ 
    where: { 
      isActive: true,
      requirementType: 'streak_days'
    } 
  });

  const unlockedAchievements = [];

  for (const achievement of achievements) {
    const userAchievement = await getUserAchievementOrCreate(userId, achievement.id);
    
    if (!userAchievement.isUnlocked) {
      const newProgress = streakDays;
      const wasUnlocked = await updateAchievementProgress(userAchievement, newProgress, achievement);
      
      if (wasUnlocked) {
        unlockedAchievements.push(achievement);
      }
    }
  }

  return unlockedAchievements;
};

/**
 * Actualizar progreso de logros basado en XaviCoins ganadas
 */
export const updateProgressFromCoins = async (userId: number, totalCoins: number): Promise<any[]> => {

  
  const user = await db.User.findByPk(userId);
  if (!user) throw new Error("Usuario no encontrado");

  const achievements = await db.Achievement.findAll({ 
    where: { 
      isActive: true,
      requirementType: 'coins_earned'
    } 
  });

  const unlockedAchievements = [];

  for (const achievement of achievements) {
    const userAchievement = await getUserAchievementOrCreate(userId, achievement.id);
    
    if (!userAchievement.isUnlocked) {
      const newProgress = totalCoins;
      const wasUnlocked = await updateAchievementProgress(userAchievement, newProgress, achievement);
      
      if (wasUnlocked) {
        unlockedAchievements.push(achievement);
      }
    }
  }

  return unlockedAchievements;
};

/**
 * Actualizar progreso de logros basado en ranking
 */
export const updateProgressFromRanking = async (userId: number, rankingPosition: number): Promise<any[]> => {

  
  const user = await db.User.findByPk(userId);
  if (!user) throw new Error("Usuario no encontrado");

  const achievements = await db.Achievement.findAll({ 
    where: { 
      isActive: true,
      requirementType: 'ranking_position'
    } 
  });

  const unlockedAchievements = [];

  for (const achievement of achievements) {
    const userAchievement = await getUserAchievementOrCreate(userId, achievement.id);
    
    if (!userAchievement.isUnlocked) {
      // Para ranking, menor posición = mejor (1er lugar es mejor que 10mo)
      const newProgress = rankingPosition;
      const wasUnlocked = await updateAchievementProgress(userAchievement, newProgress, achievement);
      
      if (wasUnlocked) {
        unlockedAchievements.push(achievement);
      }
    }
  }

  return unlockedAchievements;
};

/**
 * Función principal para actualizar progreso de logros
 * Esta función debe llamarse después de cualquier acción que pueda desbloquear logros
 */
export const updateAchievementProgressFromAction = async (progressData: AchievementProgressData): Promise<any[]> => {
  const { userId, activityType, mathTopic, xavicoinsEarned, levelReached, streakDays, perfectScore, rankingPosition } = progressData;
  

  
  const unlockedAchievements = [];
  
  // Actualizar por actividad completada
  if (activityType) {
    const activityAchievements = await updateProgressFromActivity(userId, { 
      type: activityType, 
      mathTopic, 
      perfectScore 
    });
    unlockedAchievements.push(...activityAchievements);
  }
  
  // Actualizar por nivel alcanzado
  if (levelReached) {
    const levelAchievements = await updateProgressFromLevelUp(userId, levelReached);
    unlockedAchievements.push(...levelAchievements);
  }
  
  // Actualizar por racha
  if (streakDays !== undefined) {
    const streakAchievements = await updateProgressFromStreak(userId, streakDays);
    unlockedAchievements.push(...streakAchievements);
  }
  
  // Actualizar por XaviCoins
  if (xavicoinsEarned !== undefined) {
    const coinAchievements = await updateProgressFromCoins(userId, xavicoinsEarned);
    unlockedAchievements.push(...coinAchievements);
  }
  
  // Actualizar por ranking
  if (rankingPosition !== undefined) {
    const rankingAchievements = await updateProgressFromRanking(userId, rankingPosition);
    unlockedAchievements.push(...rankingAchievements);
  }
  
  if (unlockedAchievements.length > 0) {
    
  }
  
  return unlockedAchievements;
};

/**
 * Obtener o crear un UserAchievement para un usuario y logro específico
 */
const getUserAchievementOrCreate = async (userId: number, achievementId: number): Promise<any> => {
  let userAchievement = await db.UserAchievement.findOne({
    where: { userId, achievementId }
  });

  if (!userAchievement) {
    userAchievement = await db.UserAchievement.create({
      userId,
      achievementId,
      progress: 0,
      isUnlocked: false,
      rewardClaimed: false,
    });
  }

  return userAchievement;
};

/**
 * Calcular el progreso actual para un logro específico
 */
const calculateProgressForAchievement = async (user: any, achievement: any, activityData?: any): Promise<number> => {
  switch (achievement.requirementType) {
    case "activities_completed":
      // Contar actividades completadas desde la base de datos
      const completedActivities = await db.Evidence.count({
        where: { 
          studentId: user.id,
          status: "approved"
        }
      });

      
      // Debug adicional: verificar todas las evidencias del usuario
      const allEvidences = await db.Evidence.findAll({
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
      // Por ahora, contar todas las evidencias aprobadas como "perfect scores"
      // ya que no hay sistema de puntuación implementado
      const approvedEvidences = await db.Evidence.count({
        where: { 
          studentId: user.id,
          status: "approved"
        }
      });
      return approvedEvidences;
    
    case "math_topic":
      if (achievement.mathTopic) {
        // Contar evidencias aprobadas que pertenecen a actividades del tema específico
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

        
        // Debug adicional: verificar todas las evidencias del usuario
        const allEvidences = await db.Evidence.findAll({
          where: { 
            studentId: user.id,
            status: "approved"
          },
          include: [{
            model: db.Activity,
            as: "activity"
          }]
        });

        
        return topicActivities;
      }
      return 0;
    
    case "ranking_position":
      // Obtener la mejor posición en ranking del usuario
      const bestRanking = await db.User.findOne({
        where: { id: user.id },
        attributes: ['rankingPosition']
      });
      return bestRanking?.rankingPosition || 999; // 999 como posición por defecto
    
    default:
      return 0;
  }
};

/**
 * Actualizar el progreso de un logro específico
 */
const updateAchievementProgress = async (userAchievement: any, newProgress: number, achievement: any): Promise<boolean> => {
  const oldProgress = userAchievement.progress;
  const wasUnlocked = userAchievement.isUnlocked;
  
  // Actualizar progreso
  userAchievement.progress = newProgress;
  
  // Verificar si se debe desbloquear
  let shouldBeUnlocked = false;
  
  if (achievement.requirementType === 'ranking_position') {
    // Para ranking, menor posición = mejor
    shouldBeUnlocked = newProgress <= achievement.requirementValue;
  } else {
    shouldBeUnlocked = newProgress >= achievement.requirementValue;
  }
  
  // Si se desbloqueó
  if (!wasUnlocked && shouldBeUnlocked) {
    userAchievement.isUnlocked = true;
    userAchievement.unlockedAt = new Date();

  } else if (newProgress > oldProgress) {

  }
  
  await userAchievement.save();
  return !wasUnlocked && shouldBeUnlocked;
};

/**
 * Función para forzar la actualización de todos los logros de un usuario
 * Útil para debugging o cuando se sospecha que hay inconsistencias
 */
export const forceUpdateAllUserAchievements = async (userId: number): Promise<any> => {

  
  const user = await db.User.findByPk(userId);
  if (!user) throw new Error("Usuario no encontrado");

  const achievements = await db.Achievement.findAll({ where: { isActive: true } });
  const results = { updated: 0, unlocked: 0, errors: 0 };

  for (const achievement of achievements) {
    try {
      const userAchievement = await getUserAchievementOrCreate(userId, achievement.id);
      const newProgress = await calculateProgressForAchievement(user, achievement);
      const wasUnlocked = await updateAchievementProgress(userAchievement, newProgress, achievement);
      
      results.updated++;
      if (wasUnlocked) results.unlocked++;
      
    } catch (error) {
      console.error(`❌ Error actualizando logro ${achievement.title}:`, error);
      results.errors++;
    }
  }


  return results;
}; 