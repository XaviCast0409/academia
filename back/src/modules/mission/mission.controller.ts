import { Request, Response } from 'express';
import {
  getActiveMissionsForUser,
  updateMissionProgress,
  claimMissionReward,
  getUserMissionHistory
} from './mission.service';
import { errorHelper } from '../../utils/error';

export const getActiveMissionsController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
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
    const { userId } = req.params;
    const missionId = Number(req.params.id);
    const result = await claimMissionReward(Number(userId), missionId);
    res.status(200).json(result);
  } catch (error) {
    errorHelper(error, res);
  }
};

export const getMissionHistoryController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const history = await getUserMissionHistory(Number(userId));
    res.status(200).json(history);
  } catch (error) {
    errorHelper(error, res);
  }
};
