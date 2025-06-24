import { Router } from "express";
import {
    getActivityController,
    getActivitiesController,
    createActivityController,
    updateActivityController,
    deleteActivityController,
    getAvailableActivitiesForStudentPaginatedController,
    changeEvidenceStatusAndAddXavicointsController,
    getActivityByProfessorController
} from './activity.controller'

const routerActivity = Router();

routerActivity.get('/:id', getActivityController);
routerActivity.get('/', getActivitiesController);
routerActivity.post('/create', createActivityController);
routerActivity.put('/:id', updateActivityController);
routerActivity.delete('/:id', deleteActivityController);
routerActivity.get('/available/:studentId', getAvailableActivitiesForStudentPaginatedController);
routerActivity.post('/change/evidence/:activityId', changeEvidenceStatusAndAddXavicointsController);
routerActivity.get('/professor/:professorId', getActivityByProfessorController);

export default routerActivity;