import { Request, Response } from 'express';
import {
  getActiveMissionsForUser,
  updateMissionProgress,
  claimMissionReward,
  getUserMissionHistory,
  generateMissions,
  generateDailyMissions,
  generateWeeklyMissions,
  cleanupExpiredMissions
} from './mission.service';
import MissionScheduler from '../../utils/scheduler';
import { errorHelper } from '../../utils/error';

export const getActiveMissionsController = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId;
    const missions = await getActiveMissionsForUser(Number(userId));
    res.status(200).json(missions);
  } catch (error) {
    errorHelper(error, res);
  }
};

export const updateMissionProgressController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const missionId = Number(req.params.id);
    const { increment } = req.body;
    const result = await updateMissionProgress(Number(userId), missionId, increment || 1);
    res.status(200).json(result);
  } catch (error) {
    errorHelper(error, res);
  }
};

export const claimMissionRewardController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const missionId = Number(req.params.id);
    console.log(userId, missionId);
    const result = await claimMissionReward(Number(userId), missionId);
    res.status(200).json(result);
  } catch (error) {
    errorHelper(error, res);
  }
};

export const getMissionHistoryController = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId;
    const history = await getUserMissionHistory(Number(userId));
    res.status(200).json(history);
  } catch (error) {
    errorHelper(error, res);
  }
};

export const generateMissionsController = async (req: Request, res: Response) => {
  try {
    await generateMissions();
    res.status(200).json({ message: 'Misiones generadas correctamente' });
  } catch (error) {
    errorHelper(error, res);
  }
};

// ====== CONTROLADORES DEL SCHEDULER ======

export const regenerateDailyMissionsController = async (req: Request, res: Response) => {
  try {
    await generateDailyMissions();
    res.status(200).json({ 
      success: true,
      message: 'Misiones diarias regeneradas manualmente' 
    });
  } catch (error) {
    errorHelper(error, res);
  }
};

export const regenerateWeeklyMissionsController = async (req: Request, res: Response) => {
  try {
    await generateWeeklyMissions();
    res.status(200).json({ 
      success: true,
      message: 'Misiones semanales regeneradas manualmente' 
    });
  } catch (error) {
    errorHelper(error, res);
  }
};

export const cleanupExpiredMissionsController = async (req: Request, res: Response) => {
  try {
    await cleanupExpiredMissions();
    res.status(200).json({ 
      success: true,
      message: 'Limpieza de misiones expiradas completada manualmente' 
    });
  } catch (error) {
    errorHelper(error, res);
  }
};

export const getSchedulerStatusController = async (req: Request, res: Response) => {
  try {
    const scheduler = MissionScheduler.getInstance();
    const status = scheduler.getStatus();
    
    res.status(200).json({ 
      success: true,
      data: status,
      message: 'Estado del programador de misiones' 
    });
  } catch (error) {
    errorHelper(error, res);
  }
};