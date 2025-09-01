"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStudyCard = void 0;
const sequelize_1 = require("sequelize");
class UserStudyCard extends sequelize_1.Model {
    static associate(db) {
        // Relación con User
        UserStudyCard.belongsTo(db.User, {
            foreignKey: "userId",
            as: "user",
        });
        // Relación con StudyCard
        UserStudyCard.belongsTo(db.StudyCard, {
            foreignKey: "studyCardId",
            as: "studyCard",
        });
    }
    static initModel(sequelize) {
        UserStudyCard.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
            },
            studyCardId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "study_cards",
                    key: "id",
                },
            },
            isFavorite: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            timesStudied: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            lastStudied: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
            },
            difficultyRating: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                validate: {
                    min: 1,
                    max: 5,
                },
            },
            personalNotes: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            masteryLevel: {
                type: sequelize_1.DataTypes.ENUM("nuevo", "aprendiendo", "revisando", "dominado"),
                allowNull: false,
                defaultValue: "nuevo",
            },
            nextReviewDate: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
            },
        }, {
            sequelize,
            modelName: "UserStudyCard",
            tableName: "user_study_cards",
            timestamps: true,
            indexes: [
                {
                    unique: true,
                    fields: ["userId", "studyCardId"], // Un usuario no puede tener la misma tarjeta duplicada
                },
            ],
        });
    }
}
exports.UserStudyCard = UserStudyCard;
exports.default = UserStudyCard;
