"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAchievement = void 0;
const sequelize_1 = require("sequelize");
class UserAchievement extends sequelize_1.Model {
    static associate(db) {
        UserAchievement.belongsTo(db.User, {
            foreignKey: "userId",
            as: "user",
        });
        UserAchievement.belongsTo(db.Achievement, {
            foreignKey: "achievementId",
            as: "achievement",
        });
    }
    static initModel(sequelize) {
        UserAchievement.init({
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
            achievementId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "achievements",
                    key: "id",
                },
            },
            progress: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            isUnlocked: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            unlockedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
            },
            rewardClaimed: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            claimedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
            },
        }, {
            sequelize,
            modelName: "UserAchievement",
            tableName: "user_achievements",
            timestamps: true,
        });
    }
}
exports.UserAchievement = UserAchievement;
exports.default = UserAchievement;
