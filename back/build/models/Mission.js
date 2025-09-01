"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mission = void 0;
const sequelize_1 = require("sequelize");
class Mission extends sequelize_1.Model {
    static associate(db) {
        // Relaciones futuras si es necesario
    }
    static initModel(sequelize) {
        Mission.init({
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
            type: {
                type: sequelize_1.DataTypes.ENUM('DAILY', 'WEEKLY', 'GROUP', 'SPECIAL'),
                allowNull: false,
            },
            groupId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            requiredCount: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            rewardType: {
                type: sequelize_1.DataTypes.ENUM('COINS', 'BADGE', 'ITEM'),
                allowNull: false,
            },
            rewardAmount: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            isActive: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            startDate: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
            },
            endDate: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
            },
        }, {
            sequelize,
            modelName: 'Mission',
            tableName: 'missions',
            timestamps: true,
        });
    }
}
exports.Mission = Mission;
exports.default = Mission;
