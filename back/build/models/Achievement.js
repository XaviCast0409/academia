"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Achievement = void 0;
const sequelize_1 = require("sequelize");
class Achievement extends sequelize_1.Model {
    static associate(db) {
        Achievement.hasMany(db.UserAchievement, {
            foreignKey: "achievementId",
            as: "userAchievementInstances",
        });
    }
    static initModel(sequelize) {
        Achievement.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            icon: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            category: {
                type: sequelize_1.DataTypes.ENUM("progress", "math", "gamification", "competition", "special"),
                allowNull: false,
            },
            requirementType: {
                type: sequelize_1.DataTypes.ENUM("activities_completed", "level_reached", "streak_days", "coins_earned", "ranking_position", "perfect_scores", "math_topic"),
                allowNull: false,
            },
            requirementValue: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            requirementCondition: {
                type: sequelize_1.DataTypes.ENUM("consecutive", "total", "unique"),
                allowNull: true,
            },
            mathTopic: {
                type: sequelize_1.DataTypes.ENUM("aritmetica", "algebra", "geometria", "trigonometria", "razonamiento_matematico"),
                allowNull: true,
            },
            rewardType: {
                type: sequelize_1.DataTypes.ENUM("coins", "badge", "title", "avatar_frame"),
                allowNull: false,
            },
            rewardValue: {
                type: sequelize_1.DataTypes.STRING, // Puede ser número o string
                allowNull: false,
            },
            isActive: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
        }, {
            sequelize,
            modelName: "Achievement",
            tableName: "achievements",
            timestamps: true,
        });
    }
}
exports.Achievement = Achievement;
exports.default = Achievement;
