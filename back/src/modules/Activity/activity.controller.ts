import { Request, Response } from "express";
import {
  getActivity,
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity,
  getAvailableActivitiesForStudentPaginated,
  changeEvidenceStatusAndAddXavicoints
} from "./activity.service";

import { ActivityInput } from "../../models/Activity";
import { errorHelper } from "../../utils/error";

export const getActivityController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await getActivity(parseInt(id));
    res.status(200).json(activity);
  } catch (error) {
    errorHelper(error, res);
  }
};

export const getActivitiesController = async (_req: Request, res: Response) => {
  try {
    const activities = await getActivities();
    res.status(200).json(activities);
  } catch (error) {
    errorHelper(error, res);
  }
};

export const createActivityController = async (req: Request, res: Response) => {
  try {
    const { title, description, xavicoints, images, professorId, difficulty } = req.body as ActivityInput;
    const activity = await createActivity({
      title,
      description,
      images,
      xavicoints,
      professorId,
      difficulty
    });
    res.status(201).json(activity);
  } catch (error) {
    errorHelper(error, res);
  }
};

export const updateActivityController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, xavicoints, images } = req.body as ActivityInput;
    const { professorId } = req.body as ActivityInput;
    const activity = await updateActivity(parseInt(id), {
      title,
      description,
      images,
      xavicoints,
      professorId,
    });
    res.status(200).json(activity);
  } catch (error) {
    errorHelper(error, res);
  }
};

export const deleteActivityController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await deleteActivity(parseInt(id));
    res.status(200).json(activity);
  } catch (error) {
    errorHelper(error, res);
  }
};

export const getAvailableActivitiesForStudentPaginatedController = async (
  req: Request,
  res: Response
) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const studentId = req.params.studentId;

    const activities = await getAvailableActivitiesForStudentPaginated(
      Number(studentId),
      parseInt(page as string),
      parseInt(limit as string)
    );
    res.status(200).json(activities);
  } catch (error) {
    errorHelper(error, res);
  }
};

export const changeEvidenceStatusAndAddXavicointsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { activityId } = req.params;
    const { evidenceId, status } = req.body;
    const updatedEvidence = await changeEvidenceStatusAndAddXavicoints(
      evidenceId,
      status,
      parseInt(activityId)
    );
    res.status(200).json(updatedEvidence);
  } catch (error) {
    errorHelper(error, res);
  }
};