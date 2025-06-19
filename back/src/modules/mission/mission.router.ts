import { Router } from 'express';
import {
  getActiveMissionsController,
  updateMissionProgressController,
  claimMissionRewardController,
  getMissionHistoryController
} from './mission.controller';

const routerMission = Router();

routerMission.get('/active', getActiveMissionsController);
routerMission.post('/:id/progress', updateMissionProgressController);
routerMission.post('/:id/claim', claimMissionRewardController);
routerMission.get('/history', getMissionHistoryController);

export default routerMission;
