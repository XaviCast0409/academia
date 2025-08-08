import { Router } from 'express';
import { listNotificationsController, markAsReadController } from './notification.controller';

const router = Router();

router.get('/:userId', listNotificationsController);
router.post('/:id/read', markAsReadController);

export default router;


