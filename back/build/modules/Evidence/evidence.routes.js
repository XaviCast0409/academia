"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const evidence_controller_1 = require("./evidence.controller");
const routerEvidence = (0, express_1.Router)();
routerEvidence.get("/:id", evidence_controller_1.getEvidenceController);
routerEvidence.post("/", evidence_controller_1.createEvidenceController);
routerEvidence.put("/:id", evidence_controller_1.updateEvidenceController);
routerEvidence.delete("/:id", evidence_controller_1.deleteEvidenceController);
routerEvidence.get("/activities/:activityId", evidence_controller_1.getEvidencesByActivityController);
routerEvidence.get("/professor/:professorId", evidence_controller_1.getProfessorEvidencesController);
routerEvidence.get("/student/:studentId", evidence_controller_1.getEvidencesByStudentController);
// Nueva ruta para cambiar estado de evidencia con integración de logros
routerEvidence.post("/change-status/:evidenceId", evidence_controller_1.changeEvidenceStatusController);
exports.default = routerEvidence;
