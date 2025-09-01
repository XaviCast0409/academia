import { StudyCard, StudyCardInput } from "../../models/StudyCard";
import { UserStudyCard } from "../../models/UserStudyCard";
import { StudySession } from "../../models/StudySession";
import { User } from "../../models/User";
import { Op } from "sequelize";

export class StudyCardService {
  
  // Obtener todas las tarjetas activas con filtros
  async getAllStudyCards(filters: {
    category?: string;
    mathTopic?: string;
    difficulty?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }) {
    const whereClause: any = { isActive: true };
    
    if (filters.category) {
      whereClause.category = filters.category;
    }
    
    if (filters.mathTopic) {
      whereClause.mathTopic = filters.mathTopic;
    }
    
    if (filters.difficulty) {
      whereClause.difficulty = filters.difficulty;
    }
    
    if (filters.search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${filters.search}%` } },
        { question: { [Op.iLike]: `%${filters.search}%` } },
        { tags: { [Op.contains]: [filters.search] } }
      ];
    }

    return await StudyCard.findAndCountAll({
      where: whereClause,
      limit: filters.limit || 20,
      offset: filters.offset || 0,
      order: [['createdAt', 'DESC']],
    });
  }

  // Obtener una tarjeta por ID
  async getStudyCardById(id: number) {
    return await StudyCard.findByPk(id, {
      include: [
        {
          model: UserStudyCard,
          as: 'userStudyCards',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'name']
            }
          ]
        }
      ]
    });
  }

  // Crear una nueva tarjeta (para administradores/profesores)
  async createStudyCard(cardData: StudyCardInput) {
    return await StudyCard.create(cardData);
  }

  // Actualizar una tarjeta
  async updateStudyCard(id: number, cardData: Partial<StudyCardInput>) {
    const card = await StudyCard.findByPk(id);
    if (!card) {
      throw new Error('Tarjeta de estudio no encontrada');
    }
    
    return await card.update(cardData);
  }

  // Eliminar una tarjeta (soft delete)
  async deleteStudyCard(id: number) {
    const card = await StudyCard.findByPk(id);
    if (!card) {
      throw new Error('Tarjeta de estudio no encontrada');
    }
    
    return await card.update({ isActive: false });
  }

  // Obtener tarjetas favoritas de un usuario
  async getUserFavoriteCards(userId: number, filters?: {
    limit?: number;
    offset?: number;
  }) {
    return await UserStudyCard.findAndCountAll({
      where: { 
        userId,
        isFavorite: true 
      },
      include: [
        {
          model: StudyCard,
          as: 'studyCard',
          where: { isActive: true }
        }
      ],
      limit: filters?.limit || 20,
      offset: filters?.offset || 0,
      order: [['lastStudied', 'DESC']],
    });
  }

  // Marcar/desmarcar una tarjeta como favorita
  async toggleFavoriteCard(userId: number, studyCardId: number) {
    const [userCard, created] = await UserStudyCard.findOrCreate({
      where: { userId, studyCardId },
      defaults: {
        userId,
        studyCardId,
        isFavorite: true,
        timesStudied: 0,
        masteryLevel: 'nuevo'
      }
    });

    if (!created) {
      await userCard.update({ isFavorite: !userCard.isFavorite });
    }

    return userCard;
  }

  // Obtener progreso de estudio de un usuario
  async getUserStudyProgress(userId: number) {
    const totalCards = await StudyCard.count({ where: { isActive: true } });
    const studiedCards = await UserStudyCard.count({ 
      where: { 
        userId,
        timesStudied: { [Op.gt]: 0 }
      }
    });
    const favoriteCards = await UserStudyCard.count({ 
      where: { 
        userId,
        isFavorite: true 
      }
    });
    const masteredCards = await UserStudyCard.count({ 
      where: { 
        userId,
        masteryLevel: 'dominado'
      }
    });

    return {
      totalCards,
      studiedCards,
      favoriteCards,
      masteredCards,
      progressPercentage: totalCards > 0 ? (studiedCards / totalCards) * 100 : 0
    };
  }

  // Obtener estadísticas de una tarjeta específica
  async getCardStatistics(studyCardId: number) {
    const totalStudies = await UserStudyCard.sum('timesStudied', {
      where: { studyCardId }
    });
    
    const uniqueStudents = await UserStudyCard.count({
      where: { 
        studyCardId,
        timesStudied: { [Op.gt]: 0 }
      }
    });

    const averageDifficulty = await UserStudyCard.findOne({
      where: { 
        studyCardId
      },
      attributes: [
        [require('sequelize').fn('AVG', require('sequelize').col('difficultyRating')), 'avgDifficulty']
      ]
    });

    return {
      totalStudies: totalStudies || 0,
      uniqueStudents: uniqueStudents || 0,
      averageDifficulty: averageDifficulty?.get('avgDifficulty') || 0
    };
  }

  // Obtener tarjetas recomendadas para un usuario
  async getRecommendedCards(userId: number, limit: number = 10) {
    // Obtener tarjetas que el usuario no ha estudiado o ha estudiado poco
    const userStudiedCards = await UserStudyCard.findAll({
      where: { userId },
      attributes: ['studyCardId', 'timesStudied', 'masteryLevel']
    });

    const studiedCardIds = userStudiedCards.map(uc => uc.studyCardId);
    
    // Recomendar tarjetas nuevas o que necesitan repaso
    const whereClause: any = { 
      isActive: true,
      [Op.or]: [
        { id: { [Op.notIn]: studiedCardIds } }, // Tarjetas nuevas
        // Tarjetas que necesitan repaso (estudiadas pero no dominadas)
      ]
    };

    return await StudyCard.findAll({
      where: whereClause,
      limit,
      order: [['createdAt', 'DESC']],
    });
  }
}

export default new StudyCardService();
