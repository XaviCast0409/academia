import { Router } from 'express';
import {
  getActiveMissionsController,
  updateMissionProgressController,
  claimMissionRewardController,
  getMissionHistoryController,
  generateMissionsController
} from './mission.controller';

const routerMission = Router();

routerMission.get('/active', getActiveMissionsController);
routerMission.post('/:id/progress', updateMissionProgressController);
routerMission.post('/:id/claim', claimMissionRewardController);
routerMission.get('/history', getMissionHistoryController);
routerMission.post('/generate', generateMissionsController);

export default routerMission;
