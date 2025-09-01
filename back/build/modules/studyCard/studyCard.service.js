"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudyCardService = void 0;
const StudyCard_1 = require("../../models/StudyCard");
const UserStudyCard_1 = require("../../models/UserStudyCard");
const User_1 = require("../../models/User");
const sequelize_1 = require("sequelize");
class StudyCardService {
    // Obtener todas las tarjetas activas con filtros
    async getAllStudyCards(filters) {
        const whereClause = { isActive: true };
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
            whereClause[sequelize_1.Op.or] = [
                { title: { [sequelize_1.Op.iLike]: `%${filters.search}%` } },
                { question: { [sequelize_1.Op.iLike]: `%${filters.search}%` } },
                { tags: { [sequelize_1.Op.contains]: [filters.search] } }
            ];
        }
        return await StudyCard_1.StudyCard.findAndCountAll({
            where: whereClause,
            limit: filters.limit || 20,
            offset: filters.offset || 0,
            order: [['createdAt', 'DESC']],
        });
    }
    // Obtener una tarjeta por ID
    async getStudyCardById(id) {
        return await StudyCard_1.StudyCard.findByPk(id, {
            include: [
                {
                    model: UserStudyCard_1.UserStudyCard,
                    as: 'userStudyCards',
                    include: [
                        {
                            model: User_1.User,
                            as: 'user',
                            attributes: ['id', 'name']
                        }
                    ]
                }
            ]
        });
    }
    // Crear una nueva tarjeta (para administradores/profesores)
    async createStudyCard(cardData) {
        return await StudyCard_1.StudyCard.create(cardData);
    }
    // Actualizar una tarjeta
    async updateStudyCard(id, cardData) {
        const card = await StudyCard_1.StudyCard.findByPk(id);
        if (!card) {
            throw new Error('Tarjeta de estudio no encontrada');
        }
        return await card.update(cardData);
    }
    // Eliminar una tarjeta (soft delete)
    async deleteStudyCard(id) {
        const card = await StudyCard_1.StudyCard.findByPk(id);
        if (!card) {
            throw new Error('Tarjeta de estudio no encontrada');
        }
        return await card.update({ isActive: false });
    }
    // Obtener tarjetas favoritas de un usuario
    async getUserFavoriteCards(userId, filters) {
        return await UserStudyCard_1.UserStudyCard.findAndCountAll({
            where: {
                userId,
                isFavorite: true
            },
            include: [
                {
                    model: StudyCard_1.StudyCard,
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
    async toggleFavoriteCard(userId, studyCardId) {
        const [userCard, created] = await UserStudyCard_1.UserStudyCard.findOrCreate({
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
    async getUserStudyProgress(userId) {
        const totalCards = await StudyCard_1.StudyCard.count({ where: { isActive: true } });
        const studiedCards = await UserStudyCard_1.UserStudyCard.count({
            where: {
                userId,
                timesStudied: { [sequelize_1.Op.gt]: 0 }
            }
        });
        const favoriteCards = await UserStudyCard_1.UserStudyCard.count({
            where: {
                userId,
                isFavorite: true
            }
        });
        const masteredCards = await UserStudyCard_1.UserStudyCard.count({
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
    async getCardStatistics(studyCardId) {
        const totalStudies = await UserStudyCard_1.UserStudyCard.sum('timesStudied', {
            where: { studyCardId }
        });
        const uniqueStudents = await UserStudyCard_1.UserStudyCard.count({
            where: {
                studyCardId,
                timesStudied: { [sequelize_1.Op.gt]: 0 }
            }
        });
        const averageDifficulty = await UserStudyCard_1.UserStudyCard.findOne({
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
    async getRecommendedCards(userId, limit = 10) {
        // Obtener tarjetas que el usuario no ha estudiado o ha estudiado poco
        const userStudiedCards = await UserStudyCard_1.UserStudyCard.findAll({
            where: { userId },
            attributes: ['studyCardId', 'timesStudied', 'masteryLevel']
        });
        const studiedCardIds = userStudiedCards.map(uc => uc.studyCardId);
        // Recomendar tarjetas nuevas o que necesitan repaso
        const whereClause = {
            isActive: true,
            [sequelize_1.Op.or]: [
                { id: { [sequelize_1.Op.notIn]: studiedCardIds } }, // Tarjetas nuevas
                // Tarjetas que necesitan repaso (estudiadas pero no dominadas)
            ]
        };
        return await StudyCard_1.StudyCard.findAll({
            where: whereClause,
            limit,
            order: [['createdAt', 'DESC']],
        });
    }
}
exports.StudyCardService = StudyCardService;
exports.default = new StudyCardService();
