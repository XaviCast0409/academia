import db from "../../config/database";
import { EvidenceInput, EvidenceOutput } from "../../models/Evidence";

export const getEvidence = async (id: number): Promise<any> => {
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
  studentId: number,
  page: number = 1,
  limit: number = 10
) => {
  const offset = (page - 1) * limit;

  const { rows: evidences, count: total } = await db.Evidence.findAndCountAll({
    where: { studentId },
    include: [
      {
        model: db.Activity,
        as: "activity",
        attributes: ["id", "title", "description"],
        include: [
          {
            model: db.User,
            as: "professor",
            attributes: ["id", "name"],
          },
        ],
      },
    ],
    order: [
      [db.sequelize.literal(`CASE 
        WHEN "status" = 'pending' THEN 0
        WHEN "status" = 'approved' THEN 1
        WHEN "status" = 'rejected' THEN 2
      END`), 'ASC'],
      ['createdAt', 'ASC'],
    ],
    limit,
    offset,
  });

  return {
    evidences,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
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

export const getProfessorEvidences = async (
  professorId: number,
  page: number = 1,
  limit: number = 10
) => {
  // 1. Buscar actividades del profesor
  const activities = await db.Activity.findAll({
    where: { professorId },
    attributes: ["id"],
  });

  const activityIds = activities.map((a: any) => a.id);

  // 2. Paginación
  const offset = (page - 1) * limit;

  // 3. Evidencias con include, orden y paginado
  const { count, rows } = await db.Evidence.findAndCountAll({
    where: {
      activityId: activityIds,
    },
    include: [
      {
        model: db.User,
        as: "student",
        attributes: ["id", "name", "email"],
      },
      {
        model: db.Activity,
        as: "activity",
        attributes: ["id", "title"],
      },
    ],
    order: [
      [db.sequelize.literal(`CASE 
        WHEN "status" = 'pending' THEN 0
        WHEN "status" = 'approved' THEN 1
        WHEN "status" = 'rejected' THEN 2
      END`), 'ASC'],
      ['createdAt', 'ASC'],
    ],
    limit,
    offset,
  });

  // 4. Respuesta paginada
  return {
    evidences: rows,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
    totalItems: count,
  };
};
