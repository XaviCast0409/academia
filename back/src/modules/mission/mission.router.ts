import { Router } from 'express';
import {
  getActiveMissionsController,
  updateMissionProgressController,
  claimMissionRewardController,
  getMissionHistoryController,
  generateMissionsController,
  regenerateDailyMissionsController,
  regenerateWeeklyMissionsController,
  cleanupExpiredMissionsController,
  getSchedulerStatusController
} from './mission.controller';

const routerMission = Router();

routerMission.get('/active', getActiveMissionsController);
routerMission.post('/:id/progress', updateMissionProgressController);
routerMission.post('/:id/claim', claimMissionRewardController);
routerMission.get('/history', getMissionHistoryController);
routerMission.post('/generate', generateMissionsController);

// Rutas de administración del scheduler
routerMission.post('/admin/regenerate-daily', regenerateDailyMissionsController);
routerMission.post('/admin/regenerate-weekly', regenerateWeeklyMissionsController);
routerMission.post('/admin/cleanup-expired', cleanupExpiredMissionsController);
routerMission.get('/admin/scheduler-status', getSchedulerStatusController);

export default routerMission;
