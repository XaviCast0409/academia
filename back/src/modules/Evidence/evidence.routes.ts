import { Router } from "express";
import {
  getEvidenceController,
  createEvidenceController,
  updateEvidenceController,
  deleteEvidenceController,
  getEvidencesByActivityController,
  getProfessorEvidencesController,
  getEvidencesByStudentController,
  changeEvidenceStatusController
} from "./evidence.controller";

const routerEvidence = Router();

routerEvidence.get("/:id", getEvidenceController);
routerEvidence.post("/", createEvidenceController);
routerEvidence.put("/:id", updateEvidenceController);
routerEvidence.delete("/:id", deleteEvidenceController);
routerEvidence.get("/activities/:activityId", getEvidencesByActivityController);
routerEvidence.get("/professor/:professorId", getProfessorEvidencesController);
routerEvidence.get("/student/:studentId", getEvidencesByStudentController);

// Nueva ruta para cambiar estado de evidencia con integración de logros
routerEvidence.post("/change-status/:evidenceId", changeEvidenceStatusController);

export default routerEvidence;