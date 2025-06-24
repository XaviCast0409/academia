import db from "../../config/database";
import { ActivityInput, ActivityOutput } from "../../models/Activity";
import Evidence from "../../models/Evidence";
import { addExperience } from "../Level/level.service";
import { updateMissionProgressForActivity } from '../mission/mission.service';

export const getActivity = async (id: number): Promise<ActivityOutput> => {
  const activity = await db.Activity.findByPk(id, {
    include: [
      {
        model: db.User,
        as: "professor",
        attributes: ["id", "name"],
      },
    ],
  });
  return activity;
};

export const getActivities = async (): Promise<ActivityOutput[]> => {
  const activities = await db.Activity.findAll({
    include: [
      {
        model: db.User,
        as: "professor",
        attributes: ["id", "name"],
      },
    ],
  });
  return activities;
};

export const createActivity = async (
  activity: ActivityInput
): Promise<ActivityOutput> => {
  if (!activity.title || !activity.description || !activity.images || !activity.xavicoints) {
    throw new Error("Title, description, pdfPath and xavicoints are required.");
  }

  const newActivity = await db.Activity.create(activity);
  return newActivity;
};

export const updateActivity = async (
  id: number,
  activity: ActivityInput
): Promise<ActivityOutput> => {
  if (!activity.title || !activity.description || !activity.images || !activity.xavicoints) {
    throw new Error("Title, description, pdfPath and xavicoints are required.");
  }

  const findActivity = await db.Activity.findByPk(id);

  if (!findActivity) {
    throw new Error("Activity not found.");
  }

  const updatedActivity = await db.Activity.update(activity, {
    where: { id },
  });

  return updatedActivity;
};

export const deleteActivity = async (id: number): Promise<number> => {
  const activity = await db.Activity.destroy({ where: { id } });
  return activity;
};

export const getActivityByProfessor = async (
  professorId: number,
  page: number = 1,
  pageSize: number = 10,
  section?: string
): Promise<{
  activities: ActivityOutput[];
  total: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
}> => {
  const offset = (page - 1) * pageSize;
  
  // Construir las condiciones de where
  const whereConditions: any = { professorId };
  if (section) {
    whereConditions.section = section;
  }

  // Obtener el total de actividades que coinciden con los filtros
  const total = await db.Activity.count({
    where: whereConditions,
  });

  // Obtener las actividades paginadas y ordenadas por fecha de creación
  const activities = await db.Activity.findAll({
    where: whereConditions,
    include: [
      {
        model: db.User,
        as: "professor",
        attributes: ["id", "name"],
      },
    ],
    order: [['createdAt', 'DESC']], // Ordenar por fecha de creación descendente (más recientes primero)
    limit: pageSize,
    offset: offset,
  });

  return {
    activities,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / pageSize),
    pageSize,
  };
};

export const getActivityByStudent = async (
  studentId: number
): Promise<ActivityOutput[]> => {
  const activities = await db.Activity.findAll({
    include: [
      {
        model: db.User,
        as: "professor",
        attributes: ["id", "name"],
      },
      {
        model: db.Evidence,
        as: "evidences",
        where: { studentId },
      },
    ],
  });
  return activities;
};

export const getActivityByProfessorAndStudent = async (
  professorId: number,
  studentId: number
): Promise<ActivityOutput[]> => {
  const activities = await db.Activity.findAll({
    where: { professorId },
    include: [
      {
        model: db.User,
        as: "professor",
        attributes: ["id", "name"],
      },
      {
        model: db.Evidence,
        as: "evidences",
        where: { studentId },
      },
    ],
  });
  return activities;
};

export const getActivityById = async (
  id: number
): Promise<ActivityOutput | null> => {
  const activity = await db.Activity.findByPk(id, {
    include: [
      {
        model: db.User,
        as: "professor",
        attributes: ["id", "name"],
      },
      {
        model: db.Evidence,
        as: "evidences",
      },
    ],
  });
  return activity;
};

export const getAvailableActivitiesForStudentPaginated = async (
  studentId: number,
  page: number = 1,
  pageSize: number = 10,
  section?: string
) => {
  const offset = (page - 1) * pageSize;

  // 1. Obtener IDs de actividades ya respondidas por el estudiante
  const evidences = await db.Evidence.findAll({
    where: { studentId },
    attributes: ["activityId"],
  });
  
  const respondedActivityIds = evidences.map((evidence: Evidence) => evidence.activityId);

  // 2. Obtener actividades que NO estén en respondedActivityIds
  const allAvailableActivities = await db.Activity.findAll({
    include: [
      {
        model: db.User,
        as: "professor",
        attributes: ["id", "name", "email"],
      },
    ],
    order: [["createdAt", "DESC"]]
  });

  // 3. Filtrar manualmente (porque no usaremos Op)
  let filteredActivities = allAvailableActivities.filter((activity: ActivityInput) => {
    return !respondedActivityIds.includes(activity.id);
  });

  // 4. Aplicar filtro por sección si se proporciona
  if (section) {
    filteredActivities = filteredActivities.filter((activity: ActivityInput) => {
      return activity.section === section;
    });
  }

  // 5. Paginar manualmente
  const paginatedActivities = filteredActivities.slice(offset, offset + pageSize);

  return {
    total: filteredActivities.length,
    currentPage: page,
    totalPages: Math.ceil(filteredActivities.length / pageSize),
    pageSize,
    activities: paginatedActivities,
  };
};


export const changeEvidenceStatusAndAddXavicoints = async (
  evidenceId: number,
  status: "approved" | "rejected",
  actividadId: number
): Promise<ActivityOutput> => {
  const transaction = await db.sequelize.transaction();

  try {
    const evidence = await db.Evidence.findByPk(evidenceId, { transaction });

    if (!evidence) {
      throw new Error("Evidence not found.");
    }

    evidence.status = status;
    await evidence.save({ transaction });

    if (status === "approved") {
      const activity = await db.Activity.findByPk(actividadId, { transaction });
      if (!activity) throw new Error("Activity not found.");

      const student = await db.User.findByPk(evidence.studentId, { transaction });
      if (!student) throw new Error("Student not found.");

      // Añadir xavicoints
      student.xavicoints = (student.xavicoints || 0) + activity.xavicoints;
      await student.save({ transaction });

      // Añadir experiencia y actualizar nivel
      await addExperience(student.id, activity.difficulty, transaction);

      // Actualizar progreso de misiones relacionadas (no bloqueante)
      setImmediate(() => {
        updateMissionProgressForActivity(student.id)
          .catch((err: any) => console.error('Error updating mission progress:', err));
      });
    }

    // Obtener actividad actualizada con sus evidencias
    const updatedActivity = await db.Activity.findByPk(actividadId, {
      include: [
        { 
          model: db.Evidence, 
          as: "evidences",
          include: [ 
            {
              model: db.Activity,
              as: "activity",
              attributes: ["id", "title", "xavicoints", "difficulty"]
            },
            {
              model: db.User,
              as: "student",
              attributes: ["id", "name", "level", "experience", "xavicoints"]
            }
          ]
        }
      ],
      transaction,
    });

    await transaction.commit();

    if (!updatedActivity) throw new Error("Failed to retrieve updated activity.");
    return updatedActivity;

  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
