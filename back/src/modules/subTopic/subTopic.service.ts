import { SubTopic, SubTopicInput } from "../../models/SubTopic";
import { Course } from "../../models/Course";
import { StudyCard } from "../../models/StudyCard";
import { Op } from "sequelize";

export class SubTopicService {
  
  // Obtener todos los subtemas de un curso
  async getSubTopicsByCourse(courseId: number) {
    return await SubTopic.findAll({
      where: { 
        courseId,
        isActive: true 
      },
      order: [['order', 'ASC'], ['name', 'ASC']],
      include: [
        {
          model: Course,
          as: 'course',
          attributes: ['id', 'name']
        },
        {
          model: StudyCard,
          as: 'studyCards',
          where: { isActive: true },
          required: false,
          attributes: ['id', 'question', 'difficulty']
        }
      ]
    });
  }

  // Obtener un subtema por ID
  async getSubTopicById(id: number) {
    return await SubTopic.findByPk(id, {
      include: [
        {
          model: Course,
          as: 'course',
          attributes: ['id', 'name']
        },
        {
          model: StudyCard,
          as: 'studyCards',
          where: { isActive: true },
          required: false
        }
      ]
    });
  }

  // Crear un nuevo subtema
  async createSubTopic(subTopicData: SubTopicInput) {
    return await SubTopic.create(subTopicData);
  }

  // Actualizar un subtema
  async updateSubTopic(id: number, subTopicData: Partial<SubTopicInput>) {
    const subTopic = await SubTopic.findByPk(id);
    if (!subTopic) {
      throw new Error('Subtema no encontrado');
    }
    return await subTopic.update(subTopicData);
  }

  // Eliminar un subtema (soft delete)
  async deleteSubTopic(id: number) {
    const subTopic = await SubTopic.findByPk(id);
    if (!subTopic) {
      throw new Error('Subtema no encontrado');
    }
    return await subTopic.update({ isActive: false });
  }

  // Obtener estadísticas de un subtema
  async getSubTopicStats(subTopicId: number) {
    const subTopic = await SubTopic.findByPk(subTopicId, {
      include: [
        {
          model: Course,
          as: 'course',
          attributes: ['id', 'name']
        },
        {
          model: StudyCard,
          as: 'studyCards',
          where: { isActive: true },
          required: false,
          attributes: ['id', 'difficulty']
        }
      ]
    });

    if (!subTopic) {
      throw new Error('Subtema no encontrado');
    }

    const totalCards = subTopic.studyCards?.length || 0;

    const difficultyStats = {
      easy: 0,
      medium: 0,
      hard: 0
    };

    subTopic.studyCards?.forEach((card: any) => {
      difficultyStats[card.difficulty as keyof typeof difficultyStats]++;
    });

    return {
      subTopic,
      stats: {
        totalCards,
        difficultyStats
      }
    };
  }
}

export default new SubTopicService();
