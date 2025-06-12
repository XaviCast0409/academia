import { Router } from "express";
import {
  getEvidenceController,
  createEvidenceController,
  updateEvidenceController,
  deleteEvidenceController,
  getEvidencesByActivityController
} from "./evidence.controller";

const routerEvidence = Router();

routerEvidence.get("/:id", getEvidenceController);
routerEvidence.post("/", createEvidenceController);
routerEvidence.put("/:id", updateEvidenceController);
routerEvidence.delete("/:id", deleteEvidenceController);
routerEvidence.get("/activities/:activityId", getEvidencesByActivityController);

export default routerEvidence;