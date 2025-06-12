"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const sequelize_1 = require("sequelize");
class Activity extends sequelize_1.Model {
    static associate(db) {
        Activity.belongsTo(db.User, {
            foreignKey: "professorId",
            as: "professor",
        });
        Activity.hasMany(db.Evidence, {
            foreignKey: "activityId",
            as: "evidences",
        });
    }
    static initModel(sequelize) {
        Activity.init({
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
            images: {
                type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING), // Usar ARRAY para almacenar múltiples imágenes
                allowNull: true, // Permitir que sea nulo si no hay imágenes
            },
            xavicoints: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            professorId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
            },
        }, {
            sequelize,
            modelName: "Activity",
            tableName: "activities",
            timestamps: true,
        });
    }
}
exports.Activity = Activity;
exports.default = Activity;
