import { Course, CourseInput } from "../../models/Course";
import { SubTopic } from "../../models/SubTopic";
import { StudyCard } from "../../models/StudyCard";
import { Op } from "sequelize";

export class CourseService {
  
  // Obtener todos los cursos activos
  async getAllCourses() {
    return await Course.findAll({
      where: { isActive: true },
      order: [['order', 'ASC'], ['name', 'ASC']],
      include: [
        {
          model: SubTopic,
          as: 'subTopics',
          where: { isActive: true },
          required: false,
          include: [
            {
              model: StudyCard,
              as: 'studyCards',
              where: { isActive: true },
              required: false,
              attributes: ['id']
            }
          ]
        }
      ]
    });
  }

  // Obtener un curso por ID con sus subtemas
  async getCourseById(id: number) {
    return await Course.findByPk(id, {
      include: [
        {
          model: SubTopic,
          as: 'subTopics',
          where: { isActive: true },
          required: false,
          include: [
            {
              model: StudyCard,
              as: 'studyCards',
              where: { isActive: true },
              required: false,
              attributes: ['id', 'question', 'difficulty']
            }
          ]
        }
      ]
    });
  }

  // Crear un nuevo curso (solo administradores)
  async createCourse(courseData: CourseInput) {
    return await Course.create(courseData);
  }

  // Actualizar un curso
  async updateCourse(id: number, courseData: Partial<CourseInput>) {
    const course = await Course.findByPk(id);
    if (!course) {
      throw new Error('Curso no encontrado');
    }
    return await course.update(courseData);
  }

  // Eliminar un curso (soft delete)
  async deleteCourse(id: number) {
    const course = await Course.findByPk(id);
    if (!course) {
      throw new Error('Curso no encontrado');
    }
    return await course.update({ isActive: false });
  }

  // Obtener estadísticas de un curso
  async getCourseStats(courseId: number) {
    const course = await Course.findByPk(courseId, {
      include: [
        {
          model: SubTopic,
          as: 'subTopics',
          where: { isActive: true },
          required: false,
          include: [
            {
              model: StudyCard,
              as: 'studyCards',
              where: { isActive: true },
              required: false,
              attributes: ['id', 'difficulty']
            }
          ]
        }
      ]
    });

    if (!course) {
      throw new Error('Curso no encontrado');
    }

    const totalSubTopics = course.subTopics?.length || 0;
    const totalCards = course.subTopics?.reduce((sum, subTopic) => 
      sum + (subTopic.studyCards?.length || 0), 0) || 0;

    const difficultyStats = {
      easy: 0,
      medium: 0,
      hard: 0
    };

    course.subTopics?.forEach((subTopic: any) => {
      subTopic.studyCards?.forEach((card: any) => {
        difficultyStats[card.difficulty as keyof typeof difficultyStats]++;
      });
    });

    return {
      course,
      stats: {
        totalSubTopics,
        totalCards,
        difficultyStats
      }
    };
  }
}

export default new CourseService();
