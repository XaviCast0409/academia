import db from '../../config/database';

export const getActiveMissionsForUser = async (userId: number): Promise<any> => {
  return await db.UserMission.findAll({
    where: { userId },
    include: [{ model: db.Mission, as: 'mission', where: { isActive: true } }],
  });
};

export const assignActiveMissionsToUser = async (userId: number): Promise<any>  => {
  const activeMissions = await db.Mission.findAll({ where: { isActive: true } });
  for (const mission of activeMissions) {
    const exists = await db.UserMission.findOne({ where: { userId, missionId: mission.id } });
    if (!exists) {
      await db.UserMission.create({
        userId,
        missionId: mission.id,
        progress: 0,
        isCompleted: false,
      });
    }
  }
};

export const updateMissionProgress = async (userId: number, missionId: number, increment: number = 1): Promise<any>  => {
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

export const claimMissionReward = async (userId: number, missionId: number): Promise<any>  => {
  const userMission = await db.UserMission.findOne({ where: { userId, missionId } });
  if (!userMission || !userMission.isCompleted) return null;

  // Aquí puedes marcar la recompensa como reclamada si deseas
  return userMission;
};

export const getUserMissionHistory = async (userId: number): Promise<any>  => {
  return await db.UserMission.findAll({
    where: { userId, isCompleted: true },
    include: [{ model: db.Mission, as: 'mission' }],
    order: [['completedAt', 'DESC']],
  });
};

export const generateDailyMissions = async (): Promise<any>  => {
  await db.Mission.create({
    title: 'Completa 3 actividades hoy',
    description: 'Realiza 3 actividades diferentes en el día.',
    type: 'DAILY',
    requiredCount: 3,
    rewardType: 'COINS',
    rewardAmount: 50,
    isActive: true,
    startDate: new Date(),
    endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });
};

export const updateMissionProgressForActivity = async (userId: number): Promise<void> => {
  // Busca todas las misiones activas del usuario de tipo DAILY, WEEKLY, SPECIAL, etc. que sean de completar actividades
  const userMissions = await db.UserMission.findAll({
    where: { userId, isCompleted: false },
    include: [{ model: db.Mission, as: 'mission', where: { isActive: true } }],
  });

  for (const userMission of userMissions) {
    // Aquí puedes filtrar por tipo de misión si lo deseas (ej: sólo misiones de completar actividades)
    // if (userMission.mission.type === 'DAILY' && userMission.mission.title.includes('actividad')) {
    //   ...
    // }
    userMission.progress += 1;
    if (userMission.progress >= userMission.mission.requiredCount) {
      userMission.isCompleted = true;
      userMission.completedAt = new Date();
      // Otorgar recompensa si es necesario
    }
    await userMission.save();
  }
};
