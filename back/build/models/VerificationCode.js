"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationCode = void 0;
const sequelize_1 = require("sequelize");
class VerificationCode extends sequelize_1.Model {
    static initModel(sequelize) {
        VerificationCode.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,
                },
            },
            code: {
                type: sequelize_1.DataTypes.STRING(5),
                allowNull: false,
            },
            expiresAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            isUsed: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        }, {
            sequelize,
            modelName: "VerificationCode",
            tableName: "verification_codes",
            timestamps: true,
        });
    }
}
exports.VerificationCode = VerificationCode;
exports.default = VerificationCode;
