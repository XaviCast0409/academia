import { StudyCard, StudyCardInput } from "../../models/StudyCard";
import { Course } from "../../models/Course";
import { SubTopic } from "../../models/SubTopic";
import { UserStudyCard } from "../../models/UserStudyCard";
import { Op } from "sequelize";

export class StudyCardService {
  
  // Obtener todas las cartas de un subtema
  async getCardsBySubTopic(subTopicId: number, userId?: number) {
    const includeOptions: any[] = [
      {
        model: Course,
        as: 'course',
        attributes: ['id', 'name']
      },
      {
        model: SubTopic,
        as: 'subTopic',
        attributes: ['id', 'name']
      }
    ];

    // Si hay un usuario, incluir información de progreso
    if (userId) {
      includeOptions.push({
        model: UserStudyCard,
        as: 'userStudyCards',
        where: { userId },
        required: false,
        attributes: ['isFavorite', 'timesStudied', 'masteryLevel']
      });
    }

    const cards = await StudyCard.findAll({
      where: { 
        subTopicId,
        isActive: true 
      },
      order: [['createdAt', 'ASC']],
      include: includeOptions
    });

    // Normalize to plain objects and ensure frontend fields exist
    return cards.map((c: any) => {
      const obj = typeof c.toJSON === 'function' ? c.toJSON() : c;
      if (obj.xavicoins === undefined) obj.xavicoins = 0;
      return obj;
    });
  }

  // Obtener una carta por ID
  async getCardById(id: number, userId?: number) {
    const includeOptions: any[] = [
      {
        model: Course,
        as: 'course',
        attributes: ['id', 'name']
      },
      {
        model: SubTopic,
        as: 'subTopic',
        attributes: ['id', 'name']
      }
    ];

    if (userId) {
      includeOptions.push({
        model: UserStudyCard,
        as: 'userStudyCards',
        where: { userId },
        required: false,
        attributes: ['isFavorite', 'timesStudied', 'masteryLevel']
      });
    }

    const card = await StudyCard.findByPk(id, {
      include: includeOptions
    });

    if (!card) return null;

    const obj = typeof (card as any).toJSON === 'function' ? (card as any).toJSON() : card;
    if (obj.xavicoins === undefined) obj.xavicoins = 0;
    return obj;
  }

  // Crear una nueva carta
  async createCard(cardData: StudyCardInput) {
    return await StudyCard.create(cardData);
  }

  // Actualizar una carta
  async updateCard(id: number, cardData: Partial<StudyCardInput>) {
    const card = await StudyCard.findByPk(id);
    if (!card) {
      throw new Error('Carta no encontrada');
    }
    return await card.update(cardData);
  }

  // Eliminar una carta (soft delete)
  async deleteCard(id: number) {
    const card = await StudyCard.findByPk(id);
    if (!card) {
      throw new Error('Carta no encontrada');
    }
    return await card.update({ isActive: false });
  }

  // Obtener cartas favoritas de un usuario
  async getUserFavoriteCards(userId: number) {
    const cards = await StudyCard.findAll({
      include: [
        {
          model: Course,
          as: 'course',
          attributes: ['id', 'name']
        },
        {
          model: SubTopic,
          as: 'subTopic',
          attributes: ['id', 'name']
        },
        {
          model: UserStudyCard,
          as: 'userStudyCards',
          where: { 
            userId,
            isFavorite: true 
          },
          required: true
        }
      ],
      where: { isActive: true },
      order: [['createdAt', 'ASC']]
    });

    return cards.map((c: any) => {
      const obj = typeof c.toJSON === 'function' ? c.toJSON() : c;
      if (obj.xavicoins === undefined) obj.xavicoins = 0;
      return obj;
    });
  }

  // Marcar/desmarcar carta como favorita
  async toggleFavorite(userId: number, cardId: number) {
    const [userCard, created] = await UserStudyCard.findOrCreate({
      where: { userId, studyCardId: cardId },
      defaults: {
        userId,
        studyCardId: cardId,
        isFavorite: true,
        timesStudied: 0,
        masteryLevel: 'new'
      }
    });

    if (!created) {
      await userCard.update({ isFavorite: !userCard.isFavorite });
    }

  // return plain object
  return typeof (userCard as any).toJSON === 'function' ? (userCard as any).toJSON() : userCard;
  }

  // Registrar estudio de una carta
  async recordCardStudy(userId: number, cardId: number) {
    const [userCard, created] = await UserStudyCard.findOrCreate({
      where: { userId, studyCardId: cardId },
      defaults: {
        userId,
        studyCardId: cardId,
        isFavorite: false,
        timesStudied: 1,
        masteryLevel: 'learning',
        lastStudied: new Date()
      }
    });

    if (!created) {
      const newTimesStudied = userCard.timesStudied + 1;
      const newMasteryLevel = this.calculateMasteryLevel(newTimesStudied);
      
      await userCard.update({
        timesStudied: newTimesStudied,
        masteryLevel: newMasteryLevel,
        lastStudied: new Date()
      });
    }

  return typeof (userCard as any).toJSON === 'function' ? (userCard as any).toJSON() : userCard;
  }

  // Obtener cartas para estudio (mezcladas)
  async getCardsForStudy(subTopicId: number, limit: number = 20) {
    const cards = await StudyCard.findAll({
      where: { 
        subTopicId,
        isActive: true 
      },
      include: [
        {
          model: Course,
          as: 'course',
          attributes: ['id', 'name']
        },
        {
          model: SubTopic,
          as: 'subTopic',
          attributes: ['id', 'name']
        }
      ],
      order: [require('sequelize').fn('RANDOM')], // Orden aleatorio
      limit
    });

    return cards.map((c: any) => {
      const obj = typeof c.toJSON === 'function' ? c.toJSON() : c;
      if (obj.xavicoins === undefined) obj.xavicoins = 0;
      return obj;
    });
  }

  // Obtener todas las cartas activas, opcionalmente con paginación
  async getAllCards(limit?: number, page?: number) {
    const options: any = {
      where: { isActive: true },
      order: [['createdAt', 'ASC']],
    };

    if (limit) {
      options.limit = limit;
      if (page && page > 0) options.offset = (page - 1) * limit;
    }

    const cards = await StudyCard.findAll(options);
    return cards.map((c: any) => {
      const obj = typeof c.toJSON === 'function' ? c.toJSON() : c;
      if (obj.xavicoins === undefined) obj.xavicoins = 0;
      return obj;
    });
  }

  // Función auxiliar para calcular nivel de dominio
  private calculateMasteryLevel(timesStudied: number): "new" | "learning" | "reviewing" | "mastered" {
    if (timesStudied === 0) return "new";
    if (timesStudied <= 2) return "learning";
    if (timesStudied <= 5) return "reviewing";
    return "mastered";
  }
}

export default new StudyCardService();
