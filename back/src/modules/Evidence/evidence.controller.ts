import e, { Request, Response } from "express";
import {
  getEvidence,
  createEvidence,
  updateEvidence,
  deleteEvidence,
  getEvidencesByActivity,
  getProfessorEvidences,
  getEvidencesByStudent
} from "./evidence.service";
import { errorHelper } from "../../utils/error";

export const getEvidenceController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const evidence = await getEvidence(parseInt(id));
    res.status(200).json(evidence);
  } catch (error) {
    errorHelper(error, res);
  }
}
export const createEvidenceController = async (req: Request, res: Response) => {
  try {
    const evidenceData = req.body;
    const evidence = await createEvidence(evidenceData);
    res.status(201).json(evidence);
  } catch (error) {
    errorHelper(error, res);
  }
}
export const updateEvidenceController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const evidenceData = req.body;
    const evidence = await updateEvidence(parseInt(id), evidenceData);
    res.status(200).json(evidence);
  } catch (error) {
    errorHelper(error, res);
  }
}
export const deleteEvidenceController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteEvidence(parseInt(id));
    res.status(204).send();
  } catch (error) {
    errorHelper(error, res);
  }
}

export const getEvidencesByActivityController = async (req: Request, res: Response) => {
  try {
    const { activityId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const evidences = await getEvidencesByActivity(parseInt(activityId), Number(page), Number(limit));
    res.status(200).json(evidences);
  } catch (error) {
    errorHelper(error, res);
  }
}

export const getProfessorEvidencesController = async (req: Request, res: Response) => {
  try {
    const { professorId } = req.params;
    const { page, limit  } = req.query;
    const evidences = await getProfessorEvidences(parseInt(professorId), Number(page), Number(limit));
    res.status(200).json(evidences);
  } catch (error) {
    errorHelper(error, res);
  }
}

export const getEvidencesByStudentController = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const evidences = await getEvidencesByStudent(parseInt(studentId), Number(page), Number(limit));
    res.status(200).json(evidences);
  } catch (error) {
    errorHelper(error, res);
  }
}