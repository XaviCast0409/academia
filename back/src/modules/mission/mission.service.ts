import db from '../../config/database';

export const getActiveMissionsForUser = async (userId: number): Promise<any> => {
  return await db.UserMission.findAll({
    where: { userId, isCompleted: false },
    include: [{ model: db.Mission, as: 'mission', where: { isActive: true } }],
  });
};

export const assignActiveMissionsToUser = async (userId: number): Promise<any> => {
  console.log(`🎯 [MISSION ASSIGN] Asignando misiones activas al usuario ID: ${userId}`);
  
  const activeMissions = await db.Mission.findAll({ where: { isActive: true } });
  console.log(`📋 [MISSION ASSIGN] Misiones activas encontradas: ${activeMissions.length}`);
  
  let assignedCount = 0;
  for (const mission of activeMissions) {
    console.log(`🔍 [MISSION ASSIGN] Verificando misión: ${mission.title} (ID: ${mission.id})`);
    
    const exists = await db.UserMission.findOne({ where: { userId, missionId: mission.id } });
    if (!exists) {
      await db.UserMission.create({
        userId,
        missionId: mission.id,
        progress: 0,
        isCompleted: false,
      });
      console.log(`✅ [MISSION ASSIGN] Misión asignada: ${mission.title}`);
      assignedCount++;
    } else {
      console.log(`⏸️ [MISSION ASSIGN] Misión ya asignada: ${mission.title}`);
    }
  }
  
  console.log(`📊 [MISSION ASSIGN] Total de misiones asignadas: ${assignedCount}`);
  return { assignedCount, totalMissions: activeMissions.length };
};

export const updateMissionProgress = async (userId: number, missionId: number, increment: number = 1): Promise<any> => {
  const userMission = await db.UserMission.findOne({ where: { userId, missionId } });
  if (!userMission) return null;
  if (userMission.isCompleted) return userMission;

  userMission.progress += increment;

  const mission = await db.Mission.findByPk(missionId);
  if (mission && userMission.progress >= mission.requiredCount) {
    userMission.isCompleted = true;
    userMission.completedAt = new Date();
    // Otorgar recompensa si es necesario (ejemplo)
    // await userService.addCoins(userId, mission.rewardAmount);
  }

  await userMission.save();
  return userMission;
};

export const claimMissionReward = async (userId: number, missionId: number): Promise<any> => {
  const userMission = await db.UserMission.findOne({ where: { userId, missionId } });
  if (!userMission || !userMission.isCompleted || userMission.rewardClaimed) return null;

  // Buscar la misión para obtener la recompensa
  const mission = await db.Mission.findByPk(missionId);
  if (mission && mission.rewardType === 'COINS') {
    // Buscar el usuario y sumarle las monedas
    const user = await db.User.findByPk(userId);
    console.log(user);
    if (user) {
      user.xavicoints = (user.xavicoints || 0) + mission.rewardAmount;
      await user.save();
    }
  }

  // Marcar la recompensa como reclamada
  userMission.rewardClaimed = true;
  userMission.claimedAt = new Date();
  await userMission.save();

  return userMission;
};

export const getUserMissionHistory = async (userId: number): Promise<any> => {
  return await db.UserMission.findAll({
    where: { userId, isCompleted: true },
    include: [{ model: db.Mission, as: 'mission' }],
    order: [['completedAt', 'DESC']],
  });
};

export const generateDailyMissions = async (): Promise<any> => {
  await db.Mission.create({
    title: 'Completa y aprueba 5 actividades hoy',
    description: 'Realiza y aprueba 5 actividades diferentes en el día.',
    type: 'DAILY',
    requiredCount: 5,
    rewardType: 'COINS',
    rewardAmount: 10,
    isActive: true,
    startDate: new Date(),
    endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });
};

export const updateMissionProgressForActivity = async (userId: number): Promise<void> => {
  
  // Verificar si el usuario tiene misiones asignadas
  const allUserMissions = await db.UserMission.findAll({
    where: { userId },
    include: [{
      model: db.Mission,
      as: 'mission',
      where: { isActive: true }
    }],
  });

  // Si el usuario no tiene misiones asignadas, asignarlas automáticamente
  if (allUserMissions.length === 0) {
    await assignActiveMissionsToUser(userId);
    
    // Volver a buscar las misiones después de asignarlas
    const updatedUserMissions = await db.UserMission.findAll({
      where: { userId },
      include: [{
        model: db.Mission,
        as: 'mission',
        where: { isActive: true }
      }],
    });
  }

  // Busca todas las misiones activas del usuario que sean de completar actividades
  const userMissions = await db.UserMission.findAll({
    where: { userId, isCompleted: false },
    include: [{
      model: db.Mission,
      as: 'mission',
      where: {
        isActive: true,
        // Filtrar misiones que sean de completar actividades - filtro más amplio
        title: {
          [db.Sequelize.Op.or]: [
            { [db.Sequelize.Op.like]: '%actividad%' },
            { [db.Sequelize.Op.like]: '%activity%' },
            { [db.Sequelize.Op.like]: '%completar%' },
            { [db.Sequelize.Op.like]: '%complete%' },
            { [db.Sequelize.Op.like]: '%aprueba%' },
            { [db.Sequelize.Op.like]: '%approve%' },
            { [db.Sequelize.Op.like]: '%realiza%' },
            { [db.Sequelize.Op.like]: '%perform%' }
          ]
        }
      }
    }],
  });


  // Si no se encontraron misiones con el filtro, intentar con todas las misiones activas
  if (userMissions.length === 0) {
    
    const allActiveMissions = await db.UserMission.findAll({
      where: { userId, isCompleted: false },
      include: [{
        model: db.Mission,
        as: 'mission',
        where: { isActive: true }
      }],
    });

    
    for (const userMission of allActiveMissions) {
      
      // Incrementar progreso en 1
      userMission.progress += 1;

      // Verificar si la misión se completó
      if (userMission.progress >= userMission.mission.requiredCount) {
        userMission.isCompleted = true;
        userMission.completedAt = new Date();
      }

      await userMission.save();
    }
  } else {
    for (const userMission of userMissions) {
      
      // Incrementar progreso en 1
      userMission.progress += 1;

      // Verificar si la misión se completó
      if (userMission.progress >= userMission.mission.requiredCount) {
        userMission.isCompleted = true;
        userMission.completedAt = new Date();
      }

      await userMission.save();
    }
  }
};

export const generateWeeklyMissions = async (): Promise<any> => {
  await db.Mission.create({
    title: 'Completa y aprueba 30 actividades esta semana',
    description: 'Realiza y aprueba 30 actividades diferentes en la semana.',
    type: 'WEEKLY',
    requiredCount: 30,
    rewardType: 'COINS',
    rewardAmount: 50,
    isActive: true,
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
};

export const generateSpecialMissions = async (): Promise<any> => {
  await db.Mission.create({
    title: 'Completa y aprueba 100 actividades en un mes',
    description: 'Realiza y aprueba 100 actividades diferentes en un mes.',
    type: 'SPECIAL',
    requiredCount: 100,
    rewardType: 'COINS',
    rewardAmount: 100,
    isActive: true,
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
};

export const generateMissions = async (): Promise<any> => {
  console.log(`🎯 [MISSION GENERATE] Generando misiones de prueba`);
  await generateDailyMissions();
  await generateWeeklyMissions();
  await generateSpecialMissions();
  console.log(`✅ [MISSION GENERATE] Misiones generadas correctamente`);
};

/**
 * Verificar y crear misiones si no existen
 */
export const ensureMissionsExist = async (): Promise<void> => {
  console.log(`🔍 [MISSION ENSURE] Verificando si existen misiones en la base de datos`);
  
  const missionCount = await db.Mission.count({ where: { isActive: true } });
  console.log(`📊 [MISSION ENSURE] Misiones activas encontradas: ${missionCount}`);
  
  if (missionCount === 0) {
    console.log(`⚠️ [MISSION ENSURE] No hay misiones activas, generando misiones de prueba`);
    await generateMissions();
  } else {
    console.log(`✅ [MISSION ENSURE] Ya existen misiones activas`);
  }
};

/**
 * Limpiar misiones expiradas
 */
export const cleanupExpiredMissions = async (): Promise<void> => {
  try {
    const now = new Date();
    const expiredMissions = await db.Mission.update(
      { isActive: false },
      { 
        where: { 
          isActive: true,
          endDate: { [db.Sequelize.Op.lt]: now }
        }
      }
    );
    
    if (expiredMissions[0] > 0) {
      console.log(`🧹 ${expiredMissions[0]} misiones expiradas desactivadas`);
    }
    
  } catch (error) {
    console.error("Error limpiando misiones expiradas:", error);
    throw error;
  }
};