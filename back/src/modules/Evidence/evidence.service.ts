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
        attributes: ["id", "title", "xavicoints", "difficulty"],
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

/**
 * Cambiar estado de evidencia y agregar XaviCoins al estudiante
 * También actualiza logros automáticamente
 */
export const changeEvidenceStatusAndAddXavicoints = async (
  evidenceId: number,
  newStatus: "approved" | "rejected",
  professorId: number
): Promise<any> => {
  const transaction = await db.sequelize.transaction();

  try {
    // 1. Buscar la evidencia con información del estudiante y actividad
    const evidence = await db.Evidence.findByPk(evidenceId, {
      include: [
        {
          model: db.User,
          as: "student",
          attributes: ["id", "name", "xavicoints", "completedActivities"],
        },
        {
          model: db.Activity,
          as: "activity",
          attributes: ["id", "title", "xavicoints", "mathTopic"],
        },
      ],
      transaction,
    });

    if (!evidence) {
      await transaction.rollback();
      throw new Error("Evidencia no encontrada");
    }

    // 2. Verificar que la actividad pertenece al profesor
    const activity = await db.Activity.findByPk(evidence.activityId, {
      where: { professorId },
      transaction,
    });

    if (!activity) {
      await transaction.rollback();
      throw new Error("No tienes permisos para modificar esta evidencia");
    }

    // 3. Actualizar estado de la evidencia
    evidence.status = newStatus;
    await evidence.save({ transaction });

    // 4. Si se aprueba, otorgar XaviCoins y actualizar logros
    if (newStatus === "approved") {
      const student = evidence.student;
      const activityXavicoints = evidence.activity.xavicoints || 0;

      // Actualizar XaviCoins del estudiante
      student.xavicoints = (student.xavicoints || 0) + activityXavicoints;
      student.completedActivities = (student.completedActivities || 0) + 1;
      await student.save({ transaction });

      // Actualizar logros automáticamente    
      const { updateAchievementProgressFromAction } = await import("../achievement/achievementProgress.service");
      
      const unlockedAchievements = await updateAchievementProgressFromAction({
        userId: student.id,
        activityType: "math_activity",
        mathTopic: evidence.activity.mathTopic,
        xavicoinsEarned: activityXavicoints,
      });      
      // Actualizar misiones automáticamente
      
      const { updateMissionProgressForActivity } = await import("../mission/mission.service");
      await updateMissionProgressForActivity(student.id);
    }

    await transaction.commit();

    return {
      success: true,
      evidence: {
        id: evidence.id,
        status: evidence.status,
        studentId: evidence.studentId,
        activityId: evidence.activityId,
      },
      student: {
        id: evidence.student.id,
        name: evidence.student.name,
        xavicoints: evidence.student.xavicoints,
        completedActivities: evidence.student.completedActivities,
      },
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
