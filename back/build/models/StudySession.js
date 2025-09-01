"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudySession = void 0;
const sequelize_1 = require("sequelize");
class StudySession extends sequelize_1.Model {
    static associate(db) {
        // Relación con User
        StudySession.belongsTo(db.User, {
            foreignKey: "userId",
            as: "user",
        });
        // Relación con StudyCard (opcional)
        StudySession.belongsTo(db.StudyCard, {
            foreignKey: "studyCardId",
            as: "studyCard",
        });
    }
    static initModel(sequelize) {
        StudySession.init({
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
                allowNull: true,
                references: {
                    model: "study_cards",
                    key: "id",
                },
            },
            sessionType: {
                type: sequelize_1.DataTypes.ENUM("individual", "review", "quiz", "general"),
                allowNull: false,
                defaultValue: "general",
            },
            startTime: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            endTime: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
            },
            duration: {
                type: sequelize_1.DataTypes.INTEGER, // en minutos
                allowNull: false,
                defaultValue: 0,
            },
            cardsStudied: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            xavicoinsEarned: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            isCompleted: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            sessionGoal: {
                type: sequelize_1.DataTypes.INTEGER, // meta en minutos
                allowNull: true,
            },
            notes: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
        }, {
            sequelize,
            modelName: "StudySession",
            tableName: "study_sessions",
            timestamps: true,
        });
    }
}
exports.StudySession = StudySession;
exports.default = StudySession;
