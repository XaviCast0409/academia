import db from "../../config/database";
import { EvidenceInput, EvidenceOutput } from "../../models/Evidence";

export const getEvidence = async (id: number): Promise<EvidenceOutput> => {
  const evidence = await db.Evidence.findByPk(id, {
    include: [
      {
        model: db.User,
        as: "student",
        attributes: ["id", "name"],
      },
      {
        model: db.Activity,
        as: "activity",
        attributes: ["id", "title"],
      },
    ],
  });
  return evidence;
};

export const getEvidencesByStudent = async (
  studentId: number
): Promise<EvidenceOutput[]> => {
  const evidences = await db.Evidence.findAll({
    where: { studentId },
    include: [
      {
        model: db.User,
        as: "student",
        attributes: ["id", "name"],
      },
      {
        model: db.Activity,
        as: "activity",
        attributes: ["id", "title"],
      },
    ],
  });
  return evidences;
};

export const getEvidencesByActivity = async (
  activityId: number,
  page: number,
  limit: number
) => {
  const offset = (page - 1) * limit;

  const { rows: evidences, count: total } = await db.Evidence.findAndCountAll({
    where: { activityId },
    include: [
      {
        model: db.User,
        as: "student",
        attributes: ["id", "name", "email"],
      },
    ],
    order: [["createdAt", "DESC"]],
    limit,
    offset,
  });

  const formatted = evidences.map((e: any) => ({
    id: e.id,
    studentId: e.studentId,
    studentName: e.student?.name,
    studentEmail: e.student?.email,
    filePath: e.filePath,
    status: e.status,
    createdAt: e.createdAt,
    activityId: e.activityId,
    activityTitle: e.activity?.title,
    activityDescription: e.activity?.description,
    activityType: e.activity?.type,
  }));

  return {
    evidences: formatted,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};


export const createEvidence = async (
  evidenceData: EvidenceInput
): Promise<EvidenceOutput> => {
  const evidence = await db.Evidence.create(evidenceData);
  return evidence;
};

export const updateEvidence = async (
  id: number,
  evidenceData: Partial<EvidenceInput>
): Promise<EvidenceOutput> => {
  const evidence = await db.Evidence.findByPk(id);
  if (!evidence) {
    throw new Error("Evidence not found");
  }
  await evidence.update(evidenceData);
  return evidence;
};

export const deleteEvidence = async (id: number): Promise<void> => {
  const evidence = await db.Evidence.findByPk(id);
  if (!evidence) {
    throw new Error("Evidence not found");
  }
  await evidence.destroy();
};

