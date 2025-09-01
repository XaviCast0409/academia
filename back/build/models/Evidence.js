"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Evidence = void 0;
const sequelize_1 = require("sequelize");
class Evidence extends sequelize_1.Model {
    static associate(db) {
        Evidence.belongsTo(db.User, {
            foreignKey: "studentId",
            as: "student",
        });
        Evidence.belongsTo(db.Activity, {
            foreignKey: "activityId",
            as: "activity",
        });
    }
    static initModel(sequelize) {
        Evidence.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            studentId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
            },
            activityId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "activities",
                    key: "id",
                },
            },
            filePath: {
                type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
                allowNull: false,
            },
            status: {
                type: sequelize_1.DataTypes.ENUM("pending", "approved", "rejected"),
                allowNull: false,
                defaultValue: "pending",
            },
        }, {
            sequelize,
            modelName: "Evidence",
            tableName: "evidences",
            timestamps: true,
        });
    }
}
exports.Evidence = Evidence;
exports.default = Evidence;
