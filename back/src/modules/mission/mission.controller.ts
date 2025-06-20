import { Request, Response } from 'express';
import {
  getActiveMissionsForUser,
  updateMissionProgress,
  claimMissionReward,
  getUserMissionHistory,
  generateMissions
} from './mission.service';
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