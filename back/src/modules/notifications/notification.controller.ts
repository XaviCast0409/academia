import { Request, Response } from 'express';
import { errorHelper } from '../../utils/error';
import { listUserNotifications, markAsRead } from './notification.service';

export const listNotificationsController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const result = await listUserNotifications(Number(userId), Number(page), Number(limit));
    res.status(200).json(result);
  } catch (error) {
    errorHelper(error, res);
  }
};

export const markAsReadController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const result = await markAsRead(Number(id), Number(userId));
    res.status(200).json(result);
  } catch (error) {
    errorHelper(error, res);
  }
};


