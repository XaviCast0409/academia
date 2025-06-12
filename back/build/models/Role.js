"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const sequelize_1 = require("sequelize");
class Role extends sequelize_1.Model {
    static associate(db) {
        Role.hasMany(db.User, {
            foreignKey: "roleId",
            as: "users",
        });
    }
    static initModel(sequelize) {
        Role.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Role",
            tableName: "roles",
            timestamps: true,
        });
    }
}
exports.Role = Role;
exports.default = Role;
