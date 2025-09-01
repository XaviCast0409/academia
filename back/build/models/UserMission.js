"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMission = void 0;
const sequelize_1 = require("sequelize");
class UserMission extends sequelize_1.Model {
    static associate(db) {
        UserMission.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });
        UserMission.belongsTo(db.Mission, { foreignKey: 'missionId', as: 'mission' });
    }
    static initModel(sequelize) {
        UserMission.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            missionId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            progress: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            isCompleted: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            completedAt: {
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
            modelName: 'UserMission',
            tableName: 'user_missions',
            timestamps: true,
        });
    }
}
exports.UserMission = UserMission;
exports.default = UserMission;
