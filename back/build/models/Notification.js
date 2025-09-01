"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const sequelize_1 = require("sequelize");
class Notification extends sequelize_1.Model {
    static associate(db) {
        Notification.belongsTo(db.User, {
            foreignKey: 'userId',
            as: 'user',
        });
    }
    static initModel(sequelize) {
        Notification.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            type: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            title: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            message: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            data: {
                // Postgres JSONB; for others falls back to JSON
                type: sequelize_1.DataTypes.JSONB || sequelize_1.DataTypes.JSON,
                allowNull: true,
            },
            isRead: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        }, {
            sequelize,
            modelName: 'Notification',
            tableName: 'notifications',
            timestamps: true,
        });
    }
}
exports.Notification = Notification;
exports.default = Notification;
